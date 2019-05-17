import React from 'react';

import './Form-control-select.scss';

export default function (props) {

    return (
        <div className="form-control-input">
            {props.label && <label htmlFor={props.name}>{props.required?props.label + '*':props.label}</label>}
            <select className="form-control"
                    name={props.name}
                    id={props.id}
                    defaultValue={props.defaultValue}
                    value={props.value}
                    onChange={props.handleChange}
            >
                {
                    props.options.map(option =>
                        <option key={option.value} value={option.value}>{option.text}</option>
                    )
                }
            </select>
            {props.error && <p className="form-control-input__error">{props.error}</p>}
        </div>
    )
}