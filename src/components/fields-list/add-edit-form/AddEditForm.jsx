import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FieldService from "../../../services/FieldService";

import './AddEditForm.scss';

class AddEditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            field: {
                id: this.props.field.id,
                label: this.props.field.label,
                type: this.props.field.type,
                required: this.props.field.required,
                isActive: this.props.field.isActive
            }
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSave() {
        if (this.state.field.id == null) {
            FieldService.save(this.state.field).then(
                response => {
                    this.props.onSaveField();
                }
            );
        } else {
            FieldService.update(this.state.field).then(
                response => {
                    this.props.onSaveField();
                }
            );
        }
        this.setState({ show: false});
    }

    handleChangeLabel(event) {
        this.setState({
            field: {
                ...this.state.field,
                label: event.target.value
            }
        });
    }

    handleChangeType(event) {
        this.setState({
            field: {
                ...this.state.field,
                type: event.target.value
            }
        });
    }

    handleChangeRequired(event) {
        this.setState({
            field: {
                ...this.state.field,
                required: event.target.checked
            }
        });
    }

    handleChangeIsActive(event) {
        this.setState({
            field: {
                ...this.state.field,
                isActive: event.target.checked
            }
        });
    }

    render() {
        return (
            <>
                {
                    this.props.field.id == null?
                        <Button variant="primary" onClick={this.handleShow}>Add button</Button>:
                        <i className="fa fa-edit" onClick={this.handleShow}></i>
                }

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.field.id == null?'Add field':'Edit field'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-group add-edit-form">
                            <div className="row add-edit-form__element">
                                <div className="col-md-3 text-right">
                                    <label htmlFor="label">Label*</label>
                                </div>
                                <div className="col-md-6 text-left">
                                    <input className="form-control"
                                           type="text"
                                           id="label"
                                           name="label"
                                           onChange={this.handleChangeLabel.bind(this)}
                                           defaultValue={this.state.field.label}
                                    />
                                </div>
                            </div>

                            <div className="row add-edit-form__element">
                                <div className="col-md-3 text-right">
                                    <label htmlFor="type">Type*</label>
                                </div>
                                <div className="col-md-6 text-left">
                                    <select className="form-control"
                                            id="type"
                                            name="type"
                                            onChange={this.handleChangeType.bind(this)}
                                            defaultValue={this.state.field.type}
                                    >
                                        <option value="SINGLE_LINE_TEXT">Single line text</option>
                                        <option value="MULTI_LINE_TEXT">Multiline text</option>
                                        <option value="RADIO_BUTTON">Radio button</option>
                                        <option value="CHECKBOX">Checkbox</option>
                                        <option value="COMBOBOX">Combobox</option>
                                        <option value="DATE">Date</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row add-edit-form__element">
                                <div className="col-md-6 offset-md-3 checkboxes">
                                    <div className="form-check">
                                        <input className="form-check-input"
                                               type="checkbox"
                                               id="required"
                                               name="required"
                                               onClick={this.handleChangeRequired.bind(this)}
                                               defaultChecked={this.state.field.required}
                                        />
                                        <label className="form-check-label" htmlFor="required">
                                            Required
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input"
                                               type="checkbox"
                                               id="isActive"
                                               name="isActive"
                                               onClick={this.handleChangeIsActive.bind(this)}
                                               defaultChecked={this.state.field.isActive}
                                        />
                                        <label className="form-check-label" htmlFor="isActive">
                                            Is Active
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default AddEditForm;