import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
    render() {
        let listOfMessages = this.props.messages.map((message, index) => <Message username={message.username} content={message.content} key={index}/>)
        return(
            <main className="messages">
                {listOfMessages}
            </main>
        );
    };
}

export default MessageList;