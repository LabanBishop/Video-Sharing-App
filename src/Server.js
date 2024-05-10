const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./VideoStorage");
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Define file filter function
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'file') {
      // Accept only mp4 files for the 'file' field
      if (file.mimetype === 'video/mp4') {
          cb(null, true);
      } else {
          cb(new Error('Only .mp4 files are allowed'));
      }
  } else if (file.fieldname === 'infoFile') {
      // Accept any text/plain files for the 'infoFile' field
      if (file.mimetype === 'text/plain') {
          cb(null, true);
      } else {
          cb(new Error('Only text files are allowed'));
      }
  } else {
      // Reject other files
      cb(new Error('Invalid fieldname'));
  }
};

const upload = multer({ storage, fileFilter });

app.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'infoFile', maxCount: 1 }]), (req, res) => {
    console.log(req.body);
    console.log(req.files);

    // Rename uploaded file to include original file name
    const uploadedFile = req.files.file[0];
    const newName = `${Date.now()}_${uploadedFile.originalname}`;
    fs.renameSync(uploadedFile.path, `./VideoStorage/${newName}`);

    // Process the text file
    const infoFile = req.files.infoFile[0];
    let infoFileContent = fs.readFileSync(infoFile.path, 'utf-8');

    // Extract existing categories and view count
    const existingViewCountIndex = infoFileContent.indexOf('View Count:');

    // Append title and categories if they don't exist already
    if (existingCategoriesIndex === -1 || existingViewCountIndex === -1) {
        infoFileContent += `\nTitle: ${title}\nCategories: ${categories}`;
    }

    // Save updated text file
    fs.writeFileSync(infoFile.path, infoFileContent);

    // Additional action to record the category
    // This can be saving to a database or another file, or any other desired action
    console.log(`Uploaded video titled "${title}" is categorized as "${categories}"`);

    res.status(200).send('File uploaded successfully');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});