import React from 'react';

import './Form-control-checkbox.scss'

export default function (props) {
    return (
        <div className="form-control-checkbox form-check">
            <input className="form-check-input"
                   type="checkbox"
                   name={props.name}
                   id={props.name}
                   defaultChecked={props.defaultChecked}
                   value={props.value}
                   onClick={props.handleChange}
            />
            <label className="form-check-label" htmlFor={props.name}>{props.required?props.label + '*':props.label}</label>
        </div>
    )
}