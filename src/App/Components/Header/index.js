import React from 'react';
import {
  Link,
} from 'react-router-dom';
import logo from './anan-logo.png'


class Header extends React.Component {
    render () {
        return (
            <section className="header">
                <div className="headerLogo"><Link to="/"><img src={logo} /></Link></div>
            </section>
        )
    }
}

export default Header;
