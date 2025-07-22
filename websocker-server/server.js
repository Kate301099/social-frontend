const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8080});

const clients = []

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', data => {
        const receivedData = JSON.parse(data)

        if (receivedData.type === 'my_id') {
            clients.push({
                id: receivedData.value, // hien
                ws: ws
            })
        }

        if (receivedData.type === 'message') {
            ws.send(JSON.stringify({
                type: 'message',
                id: '',
                tmp_id: receivedData.tmp_id,
                direction: 'out',
                from_id: receivedData.from_id.toString(),
                to_id: receivedData.to_id.toString(),
                message: receivedData.message,
                status: 'sent',
            }));

            console.log(clients, receivedData)

            clients.forEach((client) => {
                if (client.id === receivedData.to_id.toString() && receivedData.to_id.toString() !== receivedData.from_id.toString()) {
                    client.ws.send(JSON.stringify({
                        type: 'message',
                        id: '',
                        tmp_id: receivedData.tmp_id,
                        from_id: receivedData.from_id.toString(),
                        to_id: receivedData.to_id.toString(),
                        direction: 'in',
                        message: receivedData.message
                    }))
                }
            })
        }

        // console.log(`Received message: ${data}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// setInterval(() => console.log(clients), 1000);

console.log('WebSocket server is running on port 8080');
