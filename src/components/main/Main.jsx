import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from './../shared/header/Header';
import FieldsList from "../fields-list/FieldsList";
import ResponsesList from "../responsesList/ResponsesList";

import './Main.scss';

class Main extends Component {

    render() {
        return (
            <div className="main">
                <div className="main__header"><Header /></div>
                <div className="main__body container">
                    <Router>
                        <Route path="/responses" component={ResponsesList}/>
                        <Route path="/fields" component={FieldsList}/>
                    </Router>
                </div>
            </div>
        );
    }
}

export default Main;