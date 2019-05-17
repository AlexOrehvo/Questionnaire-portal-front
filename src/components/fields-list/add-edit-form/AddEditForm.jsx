import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FieldService from "../../../services/FieldService";
import FormControlSelect from "../../shared/form-control/form-control-select/Form-control-select";
import FormControlTextarea from "../../shared/form-control/form-control-textarea/Form-control-textarea";
import FormControlInput from "../../shared/form-control/form-control-input/Form-control-input";
import FormControlCheckbox from "../../shared/form-control/form-control-checkbox/Form-control-checkbox";

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
                active: this.props.field.active,
                options: this.props.field.options
            },
            selectedOptions: [
                {value: 'SINGLE_LINE_TEXT', text: 'Single line text'},
                {value: 'MULTI_LINE_TEXT', text: 'Multi line text'},
                {value: 'RADIO_BUTTON', text: 'Radio button'},
                {value: 'CHECKBOX', text: 'Checkbox'},
                {value: 'COMBOBOX', text: 'Combobox'},
                {value: 'DATE', text: 'Date'}
            ],
            labelError: '',
            optionsError: ''
        }
        ;

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.isValidForm = this.isValidForm.bind(this);
        this.isValidLabel = this.isValidLabel.bind(this);
        this.isValidOptions = this.isValidOptions.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSave() {
       if (this.isValidForm()) {
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
    }

    isValidForm() {
        return this.isValidLabel(this.state.field.label) && this.isValidOptions(this.state.field.options);
    }

    isValidLabel(label) {
        if(label.length === 0) {
            this.setState({labelError: 'This field is required'});
            return false;
        }

        this.setState({labelError: ''});
        return true;
    }

    isValidOptions(options) {
        if ((this.state.field.type === 'RADIO_BUTTON'
            || this.state.field.type === 'CHECKBOX'
            || this.state.field.type === 'COMBOBOX')) {

            if(options.length === 0) {
                this.setState({optionsError: 'This field is required'});
                return false;
            }
        }


        this.setState({optionsError: ''});
        return true;
    }

    handleChange = name => event => {
        this.setState({
            field: {
                ...this.state.field,
                [name]: event.target.value
            }
        });
    };

    handleChangeChecked = name => event => {
        this.setState({
            field: {
                ...this.state.field,
                [name]: event.target.checked
            }
        });
    };

    handleChangeOptions(event) {
        this.setState({
            field: {
                ...this.state.field,
                options: event.target.value.split('\n')
            }
        });
    }

    render() {
        return (
            <>
                {
                    this.props.field.id == null?
                        <button
                            className="btn btn-primary add-button"
                            type="button" onClick={this.handleShow}>
                            <span className="plus">+</span>
                            Add button
                        </button>:
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
                                    <FormControlInput
                                        type="text"
                                        id="label"
                                        name="label"
                                        handleChange={this.handleChange('label')}
                                        defaultValue={this.state.field.label}
                                        error={this.state.labelError}
                                    />
                                </div>
                            </div>

                            <div className="row add-edit-form__element">
                                <div className="col-md-3 text-right">
                                    <label htmlFor="type">Type*</label>
                                </div>
                                <div className="col-md-6 text-left">
                                    <FormControlSelect
                                        name="type"
                                        id="type"
                                        options={this.state.selectedOptions}
                                        defaultValue={this.state.field.type?this.state.field.type
                                            :this.state.selectedOptions[0]}
                                        handleChange={this.handleChange('type')}
                                    />
                                </div>
                            </div>

                            {(this.state.field.type === 'RADIO_BUTTON'
                                || this.state.field.type === 'CHECKBOX'
                                || this.state.field.type === 'COMBOBOX') &&
                            <div className="row add-edit-form__element">
                                <div className="col-md-3 text-right">
                                    <label htmlFor="type">Options*</label>
                                </div>
                                <div className="col-md-6 text-left">
                                    <FormControlTextarea
                                        id="options"
                                        name="options"
                                        rows={6}
                                        defaultValue={this.state.field.options.join('\n')}
                                        handleChange={this.handleChangeOptions.bind(this)}
                                        error={this.state.optionsError}
                                    />
                                </div>
                            </div>
                            }


                            <div className="row add-edit-form__element">
                                <div className="col-md-6 offset-md-3 checkboxes">
                                    <FormControlCheckbox
                                        id="required"
                                        name="required"
                                        defaultChecked={this.state.field.required}
                                        handleChange={this.handleChangeChecked('required')}
                                        label="Required"
                                    />
                                    <FormControlCheckbox
                                        id="active"
                                        name="active"
                                        defaultChecked={this.state.field.active}
                                        handleChange={this.handleChangeChecked('active')}
                                        label="Is active"
                                    />
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