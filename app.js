const express = require('express');
const path = require('path');
const aedes = require('aedes')();
const mqtt = require('mqtt');
const net = require('net');
const fs = require('fs');
const multer = require('multer');

const app = express();

// Set up the MQTT server
const server = net.createServer(aedes.handle);
server.listen(1883, function () {
    console.log('MQTT broker running on port 1883');
});



app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html when accessing /form
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/send', (req, res) => {
    aedes.publish({ topic: 'test/topic', payload: 'Hello from Node.js MQTT broker!' }, () => {
        res.send('Message sent to MQTT topic!');
    });
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/send-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No image uploaded');
    }

    const imageBuffer = req.file.buffer; // Get binary image data

    // Publish image via MQTT
    aedes.publish({ topic: 'test/topic', payload: imageBuffer }, () => {
        console.log(`Image sent via MQTT`);
        res.send('Image sent to MQTT topic!');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
