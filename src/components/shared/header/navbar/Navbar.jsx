import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {Link} from "react-router-dom";

import './Navbar.scss';

class Navbar extends Component {

    render() {
        return (
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
                <NavDropdown title="Dropdown" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">
                        Something else here
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        );
    }
}

export default Navbar;