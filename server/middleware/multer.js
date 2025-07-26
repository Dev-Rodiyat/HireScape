const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hirescape/user_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hirescape/resumes',
    resource_type: 'raw',
    allowed_formats: ['pdf', 'docx'],
  },
});

const logoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hirescape/company_logos',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadResume = multer({ storage: resumeStorage });
const uploadLogo = multer({ storage: logoStorage });

module.exports = {
  uploadImage,
  uploadResume,
  uploadLogo,
};
