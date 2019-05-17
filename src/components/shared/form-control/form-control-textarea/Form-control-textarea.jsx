import React from 'react';

import './Form-control-textarea.scss';

export default function (props) {

    return (
        <div className="form-control-textarea">
            {props.label && <label htmlFor={props.name}>{props.required?props.label + '*':props.label}</label>}
            <textarea className="form-control"
                    name={props.name}
                    id={props.id}
                    rows={props.rows}
                    defaultValue={props.defaultValue}
                    value={props.value}
                    onChange={props.handleChange}
            >
            </textarea>
            {props.error && <p className="form-control-textarea__error">{props.error}</p>}
        </div>
    )
}