import React from 'react';
import './index.css';

export default function Die (props){
    return(
        <div
            onClick={props.onClick}
            className={`die ${props.isHeld ? 'held' : 'unheld'}`} 
            >
            <h2 className='die-num'>{props.value}</h2>
        </div>
    )
}