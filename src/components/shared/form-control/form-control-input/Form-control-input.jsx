import React from 'react';

import './Form-control-input.scss';

export default function (props) {

    return (
        <div className="form-control-input">
            {props.label && <label htmlFor={props.name}>{props.required?props.label + '*':props.label}</label>}
            <input className="form-control"
                   type={props.type}
                   name={props.name}
                   id={props.name}
                   placeholder={props.placeholder}
                   onChange={props.handleChange}
                   defaultValue={props.defaultValue}
            />
            {props.error && <p className="form-control-input__error">{props.error}</p>}
        </div>
    )
}