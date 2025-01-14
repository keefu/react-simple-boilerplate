import React, {Component} from 'react';

class Header extends Component {
    render() {

        return(
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <a className="connect-user"> {this.props.userCount} users online</a>
            </nav>
        );
    };
}
export default Header;