const express = require('express');
const path = require('path');
const aedes = require('aedes')();
const mqtt = require('mqtt');
const net = require('net');

const app = express();


// MQTT Client connection example
const mqttClient = mqtt.connect('mqtt://localhost:1883');

// Subscribing to a topic
mqttClient.on('message', (topic, message) => {
    console.log(`Received message: ${message.toString()} on topic: ${topic}`);
});

// Subscribe to a topic
mqttClient.subscribe('test/topic');

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
