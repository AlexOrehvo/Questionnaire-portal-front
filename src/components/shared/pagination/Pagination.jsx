import React, {Component} from 'react';
import Pagination from 'react-bootstrap';

import './Logo.scss';

class Pagination1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            active: 0,
            itemsPerPage: 3
        };
    }

    componentDidMount() {
        for (let number = 1; number <= this.state.items.length; number++) {
            this.state.items.push(
                <Pagnation.Item key={number} active={number === this.state.active}>
                    {number}
                </Pagnation.Item>
            );
        }
    }

    render() {
        return(
            <div className="pagination">
                <p className="pagination__showed-items">
                    {this.state.active * this.state.itemsPerPage + 1}-
                    {this.state.itemsPerPage * (this.state.active + 1)}
                    of
                    {this.state.items.length}
                </p>
                <div className="pagination__toggle">
                    <Pagination>{this.state.items}</Pagination>
                </div>
            </div>
        );
    }

}

export default Pagination1;