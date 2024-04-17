const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', ws => {
  clients.push(ws);

  ws.on('message', message => {
    console.log('received: %s', message);
    broadcastMessage(message);
  });

  ws.on('close', () => {
    clients = clients.filter(client => client !== ws);
  });
});

function broadcastMessage(message) {
  clients.forEach(client => client.send(message));
}