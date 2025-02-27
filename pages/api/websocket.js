const WebSocket = require('ws');

let wss;


if (!global.wss) {
    wss = new WebSocket.Server({ port: 8080 });
    global.wss = wss; // store in global scope to avoid duplicates

    let connectedClients = 0;

    // connection established
    wss.on('connection', (ws) => {
        connectedClients++;
        console.log(`Client connected. Total connections: ${connectedClients}`);

        // Send start detection command as JSON
        ws.send(JSON.stringify({
            command: 'START_DETECTION'
        }));

        // Handle incoming messages
        ws.on('message', (message) => {
            console.log('Received from Java client:', message.toString());

            let parsedMessage;
            try {
                parsedMessage = JSON.parse(message);
            } catch (error) {
                console.error("X Error parsing message: ", error);
                return;
            }

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    console.log("Sending message to client: ", parsedMessage);
                    client.send(JSON.stringify(parsedMessage));
                }
            });


            // try {
            //     console.log('sending message back!');
            //     const parsedData = JSON.parse(message);

            //     if (Array.isArray(parsedData)) {
            //         // Broadcast the received array to all connected clients
            //         wss.clients.forEach((client) => {
            //             if (client.readyState === WebSocket.OPEN) {
            //                 client.send(JSON.stringify(parsedData));

            //                 ws.send(JSON.stringify(parsedData));
            //             }
            //         });
            //     }
            // } catch (error) {
            //     console.error("Invalid message format:", error);
            // }
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
}

export default function handler(req, res) {
    res.status(200).json({ message: "Websocket server running!! YIPPEE" });
}