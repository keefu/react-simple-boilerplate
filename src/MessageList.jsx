import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
    render() {
        let listOfMessages = this.props.messages.map(message => <Message username={message.username} content={message.content}/>)
        return(
            <main className="messages">
                {listOfMessages}
            </main>
        );
    };
}

export default MessageList;