const multer = require('multer');
const storage = multer.memoryStorage(); // Menggunakan memory storage agar buffer file dapat diakses

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Batasan ukuran file maksimal: 10MB
});

module.exports = upload.fields([
  { name: 'dekripsi_soal', maxCount: 1 },
  { name: 'multiple1', maxCount: 1 },
  { name: 'multiple2', maxCount: 1 },
  { name: 'multiple3', maxCount: 1 },
  { name: 'multiple4', maxCount: 1 },
  { name: 'multiple5', maxCount: 1 }
]);
