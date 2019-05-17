import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import AccountService from '../../../../services/AccountService';

import './Navbar.scss';

class Navbar extends Component {

    handleLogout() {
        AccountService.logOut();
    }

    render() {
        return (
            AccountService.isAuthenticated()?
            <Nav
                activeKey="/home"
                className="justify-content-end"
            >

                <Nav.Item>
                    <Nav.Link href="/fields">Fields</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/responses">Responses</Nav.Link>
                </Nav.Item>
                <NavDropdown title="Account" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1" href="/edit-profile">
                        Edit Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2" href="/change-password">
                        Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3" href="account/login" onClick={this.handleLogout.bind(this)}>
                        Log Out
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            :
            <Nav
                activeKey="/home"
                className="justify-content-end"
            >

                <Nav.Item>
                    <Nav.Link href="/account/login">Log In</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default Navbar;