const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
require('dotenv').config(); // Load environment variables

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const uploadDir = 'uploads/';
const filePath = path.join(uploadDir, 'latest-image.jpg');
const defaultImgPath = path.join(__dirname, 'public/imgs', 'default-img.jpg');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Load API Key from environment variable
const API_KEY = process.env.API_KEY || 'your-secure-api-key';

// Middleware to check API key
const authenticateAPIKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
    }
    
    next();
};

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

// Protect these endpoints with the API key middleware
app.post('/send-image', authenticateAPIKey, upload.single('image'), (req, res) => {
    console.log('Image received and saved!');
    res.send('Image uploaded successfully');
});

app.get('/latest-image', authenticateAPIKey, (req, res) => {
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
