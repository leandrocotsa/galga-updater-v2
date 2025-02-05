const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const uploadDir = 'uploads/';
const filePath = path.join(uploadDir, 'latest-image.jpg');
const defaultImgPath = path.join(__dirname, 'public/imgs', 'default-img.jpg');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Use Multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Delete the existing file before saving the new one
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        cb(null, 'latest-image.jpg'); // Save with the same filename
    }
});

const upload = multer({ storage });


app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to receive an image
app.post('/send-image', upload.single('image'), (req, res) => {
    console.log('Image received and saved!');
    res.send('Image uploaded successfully');
});

// Endpoint to get the latest image
app.get('/latest-image', (req, res) => {
    
    const imagePath = path.join(__dirname, 'uploads', 'latest-image.jpg');
    
    // Check if the image exists
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.sendFile(defaultImgPath);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
