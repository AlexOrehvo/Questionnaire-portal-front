import React from 'react';

export default function (props) {
    return(
        <button className={'btn btn-block ' + props.theme}
                type={props.type}
                onClick={props.onClick}
        >{props.text}</button>
    )
}