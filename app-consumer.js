const express = require('express');
const path = require('path');
const fs = require('fs');
const aedes = require('aedes')();
const mqtt = require('mqtt');
const net = require('net');

const app = express();


// MQTT Client connection example
const mqttClient = mqtt.connect('mqtt://localhost:1883');

// Subscribing to a topic
mqttClient.on('message', (topic, message) => {
    if (topic === 'test/topic') {
        console.log(`Received image on topic: ${topic}`);

        const imageBuffer = Buffer.from(message); // Ensure it's treated as binary

        const imagePath = path.join(__dirname, 'received_image.jpeg');
        fs.writeFile(imagePath, imageBuffer, { encoding: 'binary' }, (err) => {
            if (err) {
                console.error('Error saving image:', err);
            } else {
                console.log(`Image saved successfully at ${imagePath}`);
            }
        });
    }
});

// Subscribe to a topic
mqttClient.subscribe('test/topic');

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
