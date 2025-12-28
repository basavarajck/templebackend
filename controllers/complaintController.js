import Complaint from "../models/Complaint.js";

/* ---------------------------------------------
   1️⃣ Submit Complaint  (Villager Only)
--------------------------------------------- */
export const submitComplaint = async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }

    const complaint = await Complaint.create({
      title,
      message,
      createdBy: req.user.id,
    });

    return res.json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ---------------------------------------------
   2️⃣ Get Complaints for a Villager (User-only)
--------------------------------------------- */
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });

    return res.json(complaints);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -----------------------------------------------------------
   3️⃣ Get All Complaints (Committee/Admin Only)
----------------------------------------------------------- */
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("createdBy", "name email role")
      .populate("repliedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.json(complaints);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -----------------------------------------------------------
   4️⃣ Reply to Complaint (Committee/Admin Only)
----------------------------------------------------------- */
export const replyToComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ message: "Reply message is required" });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.reply = reply;
    complaint.repliedBy = req.user.id;
    complaint.status = "in-progress";

    await complaint.save();

    return res.json({
      message: "Reply sent successfully",
      complaint,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -----------------------------------------------------------
   5️⃣ Update Complaint Status (Committee/Admin Only)
----------------------------------------------------------- */
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["open", "in-progress", "resolved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    return res.json({
      message: "Status updated successfully",
      complaint,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -----------------------------------------------------------
   6️⃣ Update Complaint (Status & Reply) - Combined
----------------------------------------------------------- */
export const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reply } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (status) {
      const validStatuses = ["open", "in-progress", "resolved"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      complaint.status = status;
    }

    if (reply) {
      complaint.reply = reply;
      complaint.repliedBy = req.user.id;
      // Auto-update status if replying
      if (complaint.status === "open") {
        complaint.status = "in-progress";
      }
    }

    await complaint.save();

    return res.json({
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
