import React from 'react';

export default function SlotComp(props) {
    return (
        <div>
            {props.c1 ? props.c1 : null}
            {props.children ? props.children : null}
        </div>
    )
}