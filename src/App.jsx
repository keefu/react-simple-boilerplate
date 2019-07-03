import React, {Component} from 'react';
import ChatBar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";
import Header from "./Header.jsx";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Michelle"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Michelle",
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

  addMessage = (event) =>  {
    if(event.key === 'Enter') {
    console.log(event.target.value);
      const newMessage = {username: this.state.currentUser.name, content: event.target.value};
      this.SocketServer.send(JSON.stringify(newMessage));
      event.target.value = "";
    }
  }

  addUserName = (event) => {
    console.log(event.target.value);
    this.setState({currentUser: {name: event.target.value}});
    if(event.target.value === ""){
      this.setState({currentUser: {name: "Anonymous"}});
    }
  }
  
  //Catching message from server
  handleOnMessage = (event) => {
    console.log(event);
    console.log("JUST DATA",event.data);
    const newMessage = JSON.parse(event.data);
    const newMessages = [...this.state.messages, newMessage]
    this.setState({messages: newMessages})
  }
  
  componentDidMount() {
    this.SocketServer.onopen = this.handleOnOpen;
    this.SocketServer.onmessage = this.handleOnMessage;
    console.log("componentDidMount <App />");
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
