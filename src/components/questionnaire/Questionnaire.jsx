import React, {Component} from 'react';

import './Questionnaire.scss';
import FieldService from "../../services/FieldService";
import ResponseService from "../../services/ResponseService";
import FormControlSelect from "../shared/form-control/form-control-select/Form-control-select";
import FormControlTextarea from "../shared/form-control/form-control-textarea/Form-control-textarea";
import FormControlInput from "../shared/form-control/form-control-input/Form-control-input";
import FormControlCheckbox from "../shared/form-control/form-control-checkbox/Form-control-checkbox";

class Questionnaire extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            response: {
                map: {}
            },
            error: ''
        };
        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        FieldService.getAll().then(
            res => {
                let fields = res.data;
                let map = {};
                fields.forEach(f => map[f.id] = '');
                this.setState({
                    fields: res.data,
                    response: {
                        ...this.state.response,
                        map: map
                    }
                })
            }
        );
        ResponseService.callback = this.callback;
        ResponseService.connect();
    }

    handleChange = name => event => {
        this.setState({
            response: {
                ...this.state.response,
                map: {
                    ...this.state.response.map,
                    [name]: event.target.value
                }
            }
        });
    };

    handleSubmit() {
        if (this.isValidForm()) {
            ResponseService.send(this.state.response);
        }
        console.log(this.state);
    }

    callback = function (message) {
        if (message) {
            this.props.history.push('/congratulation');
        }

    };

    isValidForm() {
        let isValid = true;
        this.setState({error: ''});
        this.state.fields.forEach(field => {
            if (!(!field.required || this.state.response.map[field.id])) {
                this.setState({error: 'Required fields can not be empty'});
                isValid = false;
            }
        });
        return isValid;
    }

    render() {
        return(
            <div className="questionnaire">
                <form className="form-group">
                    {
                         this.state.fields.map(field =>
                             field.active &&
                            <div key={field.id}>
                                {
                                    field.type === 'SINGLE_LINE_TEXT' &&
                                    <div className="questionnaire__element">
                                        <FormControlInput
                                            type="text"
                                            name={field.label}
                                            id={field.label}
                                            label={field.label}
                                            handleChange={this.handleChange([field.id])}
                                            required={field.required}
                                        />
                                    </div>
                                }
                                {
                                    field.type === 'MULTI_LINE_TEXT' &&
                                    <div className="questionnaire__element">
                                        <FormControlTextarea
                                            name={field.label}
                                            id={field.label}
                                            label={field.label}
                                            rows={6}
                                            handleChange={this.handleChange([field.id])}
                                            required={field.required}
                                        />
                                    </div>

                                }
                                {
                                   field.type === 'DATE' &&
                                   <div className="questionnaire__element">
                                       <FormControlInput
                                           type="date"
                                           name={field.label}
                                           id={field.label}
                                           label={field.label}
                                           handleChange={this.handleChange([field.id])}
                                           required={field.required}
                                       />
                                   </div>
                                }
                                {
                                    field.type === 'RADIO_BUTTON' &&
                                    <div className="questionnaire__element">
                                        <p>{field.required?field.label+'*':field.label}</p>
                                        {
                                            field.options.map(option =>
                                                <div className="form-check" key={field.label + option}>
                                                    <input className="form-check-input"
                                                           type="radio"
                                                           name={field.label}
                                                           id={field.label}
                                                           value={option}
                                                           onChange={this.handleChange(field.id)}
                                                    />
                                                    <label htmlFor={field.label + option} className="form-check-label">
                                                        {option}
                                                    </label>
                                                </div>
                                            )
                                        }
                                    </div>
                                }
                                {
                                    field.type === 'COMBOBOX' &&
                                    <div className="questionnaire__element">
                                        <FormControlSelect
                                            name={field.label}
                                            id={field.label}
                                            label={field.label}
                                            options={field.options.map((o) => {return {value: o, text: o}})}
                                            handleChange={this.handleChange([field.id])}
                                            required={field.required}
                                            defaultValue={field.options[0]}
                                        />
                                    </div>
                                }
                                {
                                    field.type === 'CHECKBOX' &&
                                    <div className="questionnaire__element">
                                        <p>{field.required?field.label+'*':field.label}</p>
                                        {
                                            field.options.map(option =>
                                                <FormControlCheckbox
                                                    key={option}
                                                    required={field.required}
                                                    value={option}
                                                    name={field.label}
                                                    id={field.label}
                                                    handleChange={this.handleChange([field.id])}
                                                    label={option}
                                                />
                                            )
                                        }
                                    </div>
                                }
                            </div>
                        )
                    }
                </form>
                <p className="questionnaire__error">{this.state.error}</p>
                <div className="questionnaire__element">
                    <button className="btn btn-primary text-uppercase" onClick={this.handleSubmit.bind(this)}>Submit</button>
                </div>
            </div>
        );
    }
}

export default Questionnaire;