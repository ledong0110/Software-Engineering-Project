const express = require('express');
const app = express();

const http = require('http');
const WebSocket = require('ws');

const PORT = 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
	ws.on('message', (data) => {
		let message = JSON.parse(data);
		console.log('Data sent: ', message)
	});
	ws.on('close', () => {
		console.log('Client has disconnected.');
	});
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

server.listen(PORT, () => {
	console.log('Listening to port: ' + PORT);
});
