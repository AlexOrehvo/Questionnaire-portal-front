import React, {Component} from 'react';
import Pagination from 'react-bootstrap/Pagination';

import FieldService from "../../services/FieldService";
import AddEditForm from "./add-edit-form/AddEditForm";

import './FieldsList.scss';

class FieldsList extends Component {

    constructor(props) {
        super(props);
        this.defaultField = {
            label: '',
            type: 'SINGLE_LINE_TEXT',
            required: false,
            isActive: false,
            options: []
        };
        this.state = {
            fields: [],
            showedFields: [],
            columnTitle: [],
            active: 1,
            itemsPerPage: 3,
            paginationToggleValues: []

        };
        this.onSaveField = this.onSaveField.bind(this);
        this.deleteField = this.deleteField.bind(this);
    }

    componentDidMount() {
        this.initializeFieldsAndPagination();
    }

    initializeFieldsAndPagination() {
        const start = (this.state.active - 1) * this.state.itemsPerPage;
        const end = this.state.active * this.state.itemsPerPage;
        FieldService.getAll().then(
            res => {
                const fields = res.data;
                const showedFields = fields.slice(start, end);
                this.setState({
                    fields: fields,
                    showedFields: showedFields
                });
            }
        );
    }

    refreshFieldAndPagination() {
        const start = (this.state.active - 1) * this.state.itemsPerPage;
        const end = this.state.active * this.state.itemsPerPage;
        FieldService.getAll().then(
            res => {
                const fields = res.data;
                const showedFields = fields.slice(start, end);
                this.setState({
                    fields: fields,
                    showedFields: showedFields
                });
            }
        );
    }

    onSaveField() {
        this.refreshFieldAndPagination();
    };

    deleteField(id) {
        FieldService.delete(id).then(
            res =>  this.refreshFieldAndPagination()
        );
    }

    togglePage(e) {
        if (e.target.text) {
            const activeToggle = Number(e.target.text);
            const start = (activeToggle - 1) * this.state.itemsPerPage;
            const end = activeToggle * this.state.itemsPerPage;
            const showedFields = this.state.fields.slice(start, end);
            this.setState({
                active: activeToggle,
                showedFields: showedFields
            });

        }
    }

    handleChangeItemsPerPage(event) {
        const itemsPerPage = event.target.value;
        const start = (this.state.active - 1) * itemsPerPage;
        const end = this.state.active * itemsPerPage;
        const showedFields = this.state.fields.slice(start, end);
        this.setState({
            itemsPerPage: itemsPerPage,
            showedFields: showedFields
        })
    }

    render() {
        this.state.paginationToggleValues = [];
        for (let number = 1; number <= Math.ceil(this.state.fields.length / this.state.itemsPerPage); number++) {
            this.state.paginationToggleValues.push(
                <Pagination.Item key={number} active={number === this.state.active} onClick={this.togglePage.bind(this)}>
                    {number}
                </Pagination.Item>
            );
        };
        return (
            <div className="fields-list">
                <div className="fields-list-header">
                    <span className="fields-list-header__title">
                        Fields
                    </span>
                    <AddEditForm field={this.defaultField}
                                 onSaveField={this.onSaveField}
                    />
                </div>
                <div className="fields-list-table">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Label</th>
                            <th scope="col">Type</th>
                            <th scope="col">Required</th>
                            <th scope="col">Is Active</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.showedFields.map(field =>
                                <tr key={field.id}>
                                    <td>{field.label}</td>
                                    <td>{field.type}</td>
                                    <td>{Boolean(field.required).toString()}</td>
                                    <td>{Boolean(field.isActive).toString()}</td>
                                    <td className="table-buttons">
                                        <AddEditForm field={field}
                                                     onSaveField={this.onSaveField}
                                        />
                                        <i className="fa fa-trash"
                                           onClick={(()=>this.deleteField(field.id))}
                                        ></i>
                                    </td>
                                </tr>
                            )
                        }

                        </tbody>
                    </table>
                </div>
                <div className="fields-list-pagination">
                    <p className="pagination__showed-items">
                        {(this.state.active-1) * this.state.itemsPerPage + 1}-
                        {this.state.itemsPerPage * this.state.active}
                        of
                        {this.state.fields.length}
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

export default FieldsList;