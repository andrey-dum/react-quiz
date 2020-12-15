import React from 'react'
import classes from './Backdrop.module.css'

export default function Backdrop({clickHandler}) {
    return (
        <div 
            className={classes.Backdrop}
            onClick={clickHandler}
        >
            
        </div>
    )
}
