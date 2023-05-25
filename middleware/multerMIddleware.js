
// import cloudinary from "cloudinary";
// import path from "path";
// import fs from "fs";
// import multer from "multer";

// const config = {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// };

// cloudinary.config(config);

// const cloudinaryStorage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     const name = file.originalname.split(".")[0];
//     const extension = file.originalname.split(".")[1];
//     const filename = `${name}-${Date.now()}.${extension}`;
//     cb(null, filename);
//     const uploadDir = path.join(
//       path.dirname(new URL(import.meta.url).pathname),
//       "uploads"
//     );
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//   },
// });

// const multerCloudinary = multer({ storage: cloudinaryStorage });

// export const uploadToCloudinary = async (file) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(file.path, (result) => {
//       if (!result || result.error) {
//         return reject(result && result.error ? result.error.message : "Upload failed");
//       }
//       return resolve(result);
//     });
//   });
// };

// export default multerCloudinary;


import cloudinary from "cloudinary";
import path from "path";
import fs from "fs";
import multer from "multer";

const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(config);

const cloudinaryStorage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const name = file.originalname.split(".")[0];
    const extension = file.originalname.split(".")[1];
    const filename = `${name}-${Date.now()}.${extension}`;
    cb(null, filename);
    const uploadDir = path.join(
      path.dirname(new URL(import.meta.url).pathname),
      "uploads"
    );
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  },
});

const multerCloudinary = multer({ storage: cloudinaryStorage });

export const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (result) => {
      if (!result || result.error) {
        return reject(result && result.error ? result.error.message : "Upload failed");
      }
      return resolve(result);
    });
  });
};

export default multerCloudinary;