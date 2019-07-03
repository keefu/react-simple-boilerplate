import React, {Component} from 'react';
import ChatBar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";
import Header from "./Header.jsx";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id:"ThIsIsAnID123",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id:"ThIsIsAnID321",
        }
      ]
    }

  // Creating the connection to the Socket Server
  this.SocketServer = new WebSocket('ws://localhost:3001');
    
  }

  updateStatus = status => {
    this.setState({
      currentUser: {
        // spreading currentUser object properties
        ...this.state.currentUser,
        // overwriting the online key value
        online: status,
      },
    });
  };

  handleOnOpen = event => {
    console.log('Connection to server established.');
    // changing from offline to online
    this.updateStatus(true);
  };

  addMessage = (e) =>  {
    if(e.key === 'Enter') {
    console.log(e.target.value);
      const newMessage = {username: this.state.currentUser.name, content: e.target.value};
      this.SocketServer.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  }

  addUserName = (e) => {
    console.log(e.target.value);
    this.setState({currentUser: {name: e.target.value}});
    if(e.target.value === ""){
      this.setState({currentUser: {name: "Anonymous"}});
    }
  }

  componentDidMount() {
    this.SocketServer.onopen = this.handleOnOpen;
    this.SocketServer.onmessage = this.handleOnMessage;
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <h1>Hello React :)</h1>
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage} addUserName={this.addUserName}/>
        <MessageList messages={this.state.messages}/>
        <Header/>
      </div>
    )
  }
}

export default App;
