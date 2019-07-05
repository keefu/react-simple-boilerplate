import React, {Component} from 'react';
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

class MessageList extends Component {
    render() {
        //Filter props
        let listOfMessages = this.props.messages.map((message, index) => {
            switch(message.type) {
            case "incomingNotification": 
                return <Notification content={message.content}/>
            case "incomingMessage":
                return <Message username={message.username} content={message.content} key={index}/>
            }
        });    
        return(
            <main className="messages">
                {listOfMessages}
            </main>
        );
        
    };
}

export default MessageList;