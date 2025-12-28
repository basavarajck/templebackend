import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    // ✅ Cloudinary secure URL
    fileUrl: {
      type: String,
      required: true,
    },

    // ✅ Cloudinary public ID (needed for delete)
    publicId: {
      type: String,
      required: true,
    },

    // Optional link to an event
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },

    // Who uploaded the media
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Soft delete
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
