import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; // Helper we just created

export const allowedExtenstions = {
    Images: ["image/jpeg", "image/png", "image/webp"],
    Files: ["application/pdf", "application/javascript"],
    videos: ["video/mp4"]
};

export const multerFunction = (allowedExtenstionsArr, customPath) => {
    if (!allowedExtenstionsArr) {
        allowedExtenstionsArr = allowedExtenstions.Images;
    }

    // Cloudinary Storage Configuration
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: `saraha/${customPath}`, // e.g., saraha/users
            format: async (req, file) => 'png', // supports promises as well
            public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0],
        },
    });

    // File Filter
    const fileFilter = function (req, file, cb) {
        if (allowedExtenstionsArr.includes(file.mimetype)) {
            return cb(null, true);
        }
        cb(new Error("invalid Extension"), false);
    };

    const UploadFile = multer({ fileFilter, storage });
    return UploadFile;
};