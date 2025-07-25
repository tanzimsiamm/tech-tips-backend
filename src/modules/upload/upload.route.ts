import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "../../config/cloudinary.config";

const router = express.Router();

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req, file) => ({
    folder: "tech-tips",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

const upload = multer({ storage });

// Upload route
router.post("/", upload.single("image"), async (req, res): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ success: false, message: "No image uploaded" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    url: (req.file as any).path,
  });
});

export const UploadRoutes = router;
