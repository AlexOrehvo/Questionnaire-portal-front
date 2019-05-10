import React from 'react';

import './Form-control-input.scss';

export default function (props) {
    console.log(props);
    return (
        <div className="form-control-input">
            <label htmlFor={props.name}>{props.title}</label>
            <input className="form-control"
                   type={props.type}
                   name={props.name}
                   id={props.name}
                   placeholder={props.placeholder}/>
        </div>
    )
}