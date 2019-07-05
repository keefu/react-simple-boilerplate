// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder.
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server.
const wss = new WebSocket.Server({ server });
let userCount = 0;

// Set up a callback that will run when a client connects to the server.
wss.on('connection', (ws) => {
  console.log('Client connected');
  userCount++ ;
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({userCount: userCount, type: "incomingUserCount"})
      );
    }
  });
  ws.on("message", (data) => {
    const {username, content, type} = JSON.parse(data);
    let sendToClient;
    //Check type of users connected.
    switch(type) {
    case "postNotification": 
    sendToClient = {
      id: uuidv4(),
      content:content,
      type: "incomingNotification"
    }
    break;
    case "postMessage":
    sendToClient = {
      id:uuidv4(),
      username: username,
      content: content,
      type: "incomingMessage"
    }
    break;
  }
  //Send object for each client connected.
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(sendToClient));
      }
    });
  });

  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
  console.log('Client disconnected');
  userCount--;
  wss.clients.forEach(client => {
    client.send(
      JSON.stringify({userCount: userCount, type: "incomingUserCount"})
    );
  });
});
  
});

