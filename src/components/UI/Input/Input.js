import React from 'react'
import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}
// {label, type, value, handleChange, errorMessage}
const Input = (props) => {
    const inputType = props.type || 'text'
    const cls = [
        classes.Input
    ]
    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={props.inputType}
                id={props.htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {isInvalid(props) && <span>{props.errorMessage}</span>}
        </div>
    )
}

export default Input