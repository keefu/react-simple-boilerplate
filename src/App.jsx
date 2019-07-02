import React, {Component} from 'react';
import ChatBar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";
import Header from "./Header.jsx";

class App extends Component {
  constructor() {
    super()
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
    
  }
  componentDidMount() {
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
        <ChatBar currentUser={this.state.currentUser.name}/>
        <MessageList messages={this.state.messages}/>
        <Header/>
      </div>
    )
  }
}

export default App;
