// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// const connectClient = (client, nbClients) => {
//   const userId = uuidv4();
//   const message = {
//     id: userId,
//     username: `Anonymous${nbClients}`,
//     content: 'incomingClientInfo',
// };
//   // The message object always need to be stringified
//   client.send(JSON.stringify(message));
// };

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on("message", (data) => {
    const {username, content} = JSON.parse(data);
    const createId = {
      id:uuidv4(),
      username: username,
      content: content,
    }
    console.log("CreateID",createId);
    console.log(`User ${username} said ${content}`);
    ws.send(JSON.stringify(createId));
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
