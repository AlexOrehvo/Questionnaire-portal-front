import React from 'react';

import './Form-control-checkbox.scss'

export default function (props) {
    return (
        <div className="form-control-checkbox">
            <input className="form-check-input"
                   type="checkbox"
                   name={props.name}
                   id={props.name}/>
            <label className="form-check-label" htmlFor={props.name}>{props.label}</label>
        </div>
    )
}