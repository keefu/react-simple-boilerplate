import React, {Component} from 'react';

class Notification extends Component {
    render() {
        return(
            <div className="message-system">
                <span>{this.props.content}</span>
            </div>
        );
    };
 }

export default Notification;