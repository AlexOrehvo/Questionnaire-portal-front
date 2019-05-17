import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Header from './../shared/header/Header';
import FieldsList from "../fields-list/FieldsList";
import ResponsesList from "../responses-list/ResponsesList";
import EditProfile from "./../edit-profile/EditProfile";
import Congratulation from './../congratulation/Congratulation';
import Questionnaire from "../questionnaire/Questionnaire";
import ChangePassword from "../change-password/ChangePassword";

import './Main.scss';

class Main extends Component {

    render() {
        return (
            <div className="main">
                <div className="main__header"><Header /></div>
                <div className="main__body container">
                    <Switch>
                        <Router>
                            <Route exact path="/" component={Questionnaire}/>
                            <Route path="/responses" component={ResponsesList}/>
                            <Route path="/fields" component={FieldsList}/>
                            <Route path="/edit-profile" component={EditProfile}/>
                            <Route path="/change-password" component={ChangePassword}/>
                            <Route path="/congratulation" component={Congratulation}/>
                        </Router>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Main;