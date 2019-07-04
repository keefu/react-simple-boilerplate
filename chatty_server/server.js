// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on("message", (data) => {
    const {username, content, type} = JSON.parse(data);
    console.log("Constants:", username, content, type);
    console.log("DATA:",data)
    let sendToClient;
    // Check the type of message that is sent:
    console.log("DATA TYPE:",type)
    switch(type) {
    // Notification OR Message?
    // If JSON.parse(data).type === "postNotification" ...
    case "postNotification": 
    sendToClient = {
      id: uuidv4(),
      content:content,
      type: "incomingNotification"
    }
    break;
    // else if the other type, do this below.
    case "postMessage":
    sendToClient = {
      id:uuidv4(),
      username: username,
      content: content,
      type: "incomingMessage"
    }
    break;
  }
    console.log("CREATE ID option",sendToClient);
    // console.log(`User ${username} said ${content}`);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(sendToClient));
      }
    });
    // ws.send(JSON.stringify(createId));
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
