import Announcement from "../models/Announcement.js";
import { logActivity } from "../utils/activityLogger.js";

/* -------------------------------------------------
   1️⃣ CREATE ANNOUNCEMENT (Committee/Admin)
------------------------------------------------- */
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, category } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }

    const announcement = await Announcement.create({
      title,
      message,
      category: category || "general",
      createdBy: req.user.id,
    });
    await logActivity(
  "CREATE_ANNOUNCEMENT",
  "Announcement",
  announcement._id,
  req.user.id,
  { title: announcement.title, category: announcement.category }
);

    return res.json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------
   2️⃣ GET ALL ACTIVE ANNOUNCEMENTS (Public)
------------------------------------------------- */
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true })
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    return res.json(announcements);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------
   3️⃣ UPDATE ANNOUNCEMENT (Committee/Admin)
------------------------------------------------- */
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, category, isActive } = req.body;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    if (title !== undefined) announcement.title = title;
    if (message !== undefined) announcement.message = message;
    if (category !== undefined) announcement.category = category;
    if (isActive !== undefined) announcement.isActive = isActive;

    await announcement.save();
    // ✅ ACTIVITY LOG — Update Announcement
await logActivity(
  "UPDATE_ANNOUNCEMENT",
  "Announcement",
  announcement._id,
  req.user.id,
  {
    title: announcement.title,
    isActive: announcement.isActive,
  }
);


    return res.json({
      message: "Announcement updated successfully",
      announcement,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------
   4️⃣ DELETE ANNOUNCEMENT (Admin only later)
------------------------------------------------- */
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    // ✅ ACTIVITY LOG — Delete Announcement
await logActivity(
  "DELETE_ANNOUNCEMENT",
  "Announcement",
  id,
  req.user.id
);

    return res.json({
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
