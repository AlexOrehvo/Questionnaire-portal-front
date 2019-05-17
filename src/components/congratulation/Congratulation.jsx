import React, {Component} from 'react';

import './Congratulation.scss';

class Main extends Component {

    render() {
        return (
            <div className="congratulation">
                <p className="congratulation__thank">Thank you!</p>
                <p className="congratulation__message">Your response was saved.</p>
            </div>
        );
    }
}

export default Main;