import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


import Logo from '../logo/Logo';
import Navbar from './navbar/Navbar';

import './Header.scss';

class Header extends Component {

    render() {
        return (
            <div className="header">
                <Container>
                    <Row>

                        <Col md={4}>
                            <Logo/>
                        </Col>
                        <Col>
                            <Navbar className="header__navbar"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Header;