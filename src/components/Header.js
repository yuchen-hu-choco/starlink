import React, {Component} from 'react';
import starlinkLogo  from '../assets/images/Starlink_Logo.svg';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={starlinkLogo} className="App-logo" alt="logo" />
                <p className="title">
                    Star Path <span className="comment"> - A StarLink Tracker</span> 
                </p>
            </header>
        );
    }
}
export default Header;