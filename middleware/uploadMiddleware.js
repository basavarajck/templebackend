import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "temple-management",
    resource_type: "auto", // images, pdf, video
  },
});

const upload = multer({ storage });

export default upload;
