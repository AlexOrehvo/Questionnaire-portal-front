import React, {Component} from 'react';
import Pagination from 'react-bootstrap/Pagination';

import ResponseService from './../../services/ResponseService';
import ResponseServiceRest from "../../services/ResponseServiceRest";
import FieldService from "../../services/FieldService";

import './ResponsesList.scss';

class ResponsesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            responses: [],
            showedResponses: [],
            paginationToggleValues: [],
            active: 1,
            itemsPerPage: 3
        };
        ResponseService.callback = this.callback.bind(this);
        ResponseService.connect();
    }

    componentDidMount() {
        const start = (this.state.active - 1) * this.state.itemsPerPage;
        const end = this.state.active * this.state.itemsPerPage;
        ResponseServiceRest.getAll().then(
            res => {
                const showedResponses = res.data.slice(start, end);
                this.setState({
                    responses: res.data,
                    showedResponses: showedResponses
                })
            }
        );
        FieldService.getAll().then(
          res => this.setState({fields: res.data})
        );
    }

    callback = function (message) {
      if (message) {
          let response = JSON.parse(message.body);
          let responses = this.state.responses;
          responses.push(response);
          this.setState({
              responses: responses,
          });
      }
    };

    send(response) {
        ResponseService.send(response.toString());
    }

    togglePage(e) {
        if (e.target.text) {
            const activeToggle = Number(e.target.text);
            const start = (activeToggle - 1) * this.state.itemsPerPage;
            const end = activeToggle * this.state.itemsPerPage;
            const showedResponses = this.state.responses.slice(start, end);
            this.setState({
                active: activeToggle,
                showedResponses: showedResponses
            });
        }
    }

    handleChangeItemsPerPage(event) {
        const itemsPerPage = event.target.value;
        if (itemsPerPage) {
            const start = (this.state.active - 1) * itemsPerPage;
            const end = this.state.active * itemsPerPage;
            const showedResponses = this.state.responses.slice(start, end);
            this.setState({
                itemsPerPage: itemsPerPage,
                showedResponses: showedResponses
            })
        }
    }

    render() {
        this.state.paginationToggleValues = [];
        for (let number = 1; number <= Math.ceil(this.state.responses.length / this.state.itemsPerPage); number++) {
            this.state.paginationToggleValues.push(
                <Pagination.Item key={number} active={number === this.state.active} onClick={this.togglePage.bind(this)}>
                    {number}
                </Pagination.Item>
            );
        };
        return (
            <div className="responses-list">
                <div className="responses-list-header">
                    Responses
                </div>
                <div className="responses-list-table">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {
                                this.state.fields.map(field =>
                                    <th scope="col" key={field.id}>
                                        {field.label}
                                    </th>
                                )
                            }
                        </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.showedResponses.map(response =>
                                    <tr key={response.id}>
                                        {
                                            this.state.fields.map(field =>
                                                <td key={response.id + '' + field.id}>
                                                    {response.map[field.id]?response.map[field.id]:'N/A'}
                                                </td>
                                            )
                                        }
                                        <td>

                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="responses-list-pagination">
                    <p className="pagination__showed-items">
                        {(this.state.active-1) * this.state.itemsPerPage + 1}-
                        {this.state.itemsPerPage * this.state.active}
                        of
                        {this.state.responses.length}
                    </p>
                    <Pagination>{this.state.paginationToggleValues}</Pagination>
                    <input
                        className="toggleItemsPerPage form-control"
                        type="number"
                        min="1"
                        max="10"
                        defaultValue={this.state.itemsPerPage}
                        onChange={this.handleChangeItemsPerPage.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default ResponsesList;