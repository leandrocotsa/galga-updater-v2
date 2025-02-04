const express = require('express');
const path = require('path');
const aedes = require('aedes')();
const mqtt = require('mqtt');
const net = require('net');
const fs = require('fs');

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

app.post('/send-image', (req, res) => {
    const chunks = [];
    
    // Listen to the incoming data from the request
    req.on('data', chunk => {
        chunks.push(chunk);
    });

    req.on('end', () => {
        // Combine all the chunks and create a buffer from the image data
        const imageBuffer = Buffer.concat(chunks);

        // Publish the image data to the MQTT topic
        aedes.publish({ topic: 'test/topic', payload: imageBuffer }, () => {
            res.send('Image sent to MQTT topic!');
            console.log(`sent image`);
        });
    });

    req.on('error', (err) => {
        console.error('Error receiving image:', err);
        res.status(500).send('Error sending image.');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
