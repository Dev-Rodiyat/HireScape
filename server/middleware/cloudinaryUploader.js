const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";

    return {
      folder: "job-portal",
      resource_type: isPdf ? "raw" : "image", // important!
      format: isPdf ? undefined : "jpg", // only convert image files
      allowed_formats: ["jpg", "jpeg", "png", "pdf"],
      ...(isPdf
        ? {}
        : {
            transformation: [{ width: 300, height: 300, crop: "limit" }],
          }),
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
