import Event from "../models/Event.js";
import { logActivity } from "../utils/activityLogger.js";

/* -------------------------------------------------
   1️⃣ CREATE EVENT (Committee/Admin)
------------------------------------------------- */
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      eventType,
      startDate,
      endDate,
      budget,
    } = req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({
        message: "Title, startDate and endDate are required",
      });
    }

    const event = await Event.create({
      title,
      description,
      eventType,
      startDate,
      endDate,
      budget,
      createdBy: req.user.id,
    });

  // ✅ ACTIVITY LOG — Create Event
await logActivity(
  "CREATE_EVENT",
  "Event",
  event._id,
  req.user.id,
  {
    title: event.title,
    eventType: event.eventType,
    startDate: event.startDate,
    endDate: event.endDate,
  }
);

    return res.json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------
   2️⃣ GET ALL ACTIVE EVENTS (Public)
------------------------------------------------- */
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .populate("createdBy", "name role")
      .sort({ startDate: 1 });

    return res.json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------
   3️⃣ UPDATE EVENT (Committee/Admin)
------------------------------------------------- */
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const {
      title,
      description,
      eventType,
      startDate,
      endDate,
      budget,
      isActive,
    } = req.body;

    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (eventType !== undefined) event.eventType = eventType;
    if (startDate !== undefined) event.startDate = startDate;
    if (endDate !== undefined) event.endDate = endDate;
    if (budget !== undefined) event.budget = budget;
    if (isActive !== undefined) event.isActive = isActive;

    await event.save();

    // ✅ ACTIVITY LOG — Update Event
await logActivity(
  "UPDATE_EVENT",
  "Event",
  event._id,
  req.user.id,
  {
    title: event.title,
    budget: event.budget,
    isActive: event.isActive,
  }
);


    return res.json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------
   4️⃣ DISABLE EVENT (Admin Only)
------------------------------------------------- */
export const disableEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.isActive = false;
    await event.save();
    // ✅ ACTIVITY LOG — Disable Event
await logActivity(
  "DISABLE_EVENT",
  "Event",
  event._id,
  req.user.id,
  { title: event.title }
);


    return res.json({
      message: "Event disabled successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
