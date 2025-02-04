// TO RUN THIS SERVER RUN THE COMMAND node server/server.js
// If this file is moved then it's just node <path><filename>


const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let connectedClients = 0;

wss.on('connection', (ws) => {
    connectedClients++;
    console.log(`Client connected. Total connections: ${connectedClients}`);

    // Send welcome message as JSON
    ws.send(JSON.stringify({
        command: 'WELCOME',
        value: 'Welcome to the WebSocket server!'
    }));

    // Send start detection command as JSON
    ws.send(JSON.stringify({
        command: 'START_DETECTION'
    }));

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        // Echo the message back as JSON
        ws.send(JSON.stringify({
            command: 'ECHO',
            value: message.toString()
        }));
    });

    ws.on('close', () => {
        connectedClients--;
        console.log(`Client disconnected. Total connections: ${connectedClients}`);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');