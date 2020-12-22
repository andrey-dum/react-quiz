import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
// import axios from 'axios'
// import { API_KEY } from '../../db'
import { auth } from '../../store/actions/auth'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function Auth() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    const [formState, setFormState] = React.useState({
        isFromValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Введите корректный password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            },
        }
    })

    const loginHandler = () => {
        dispatch(auth(
            formState.formControls.email.value,
            formState.formControls.password.value,
            true
            
        ))
    }


    const registerHandler = () => {
        dispatch(auth(
            formState.formControls.email.value,
            formState.formControls.password.value,
            false
            
        ))
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    function validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        
        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    const onChangeHandler = (event, controlName) => {
        const formControls = {...formState.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        setFormState({
            ...formState,
            formControls,
            isFormValid
        })
    }
    
    const renderInputs = () => {
        const inputs = Object.keys(formState.formControls).map((controlName, index) => {
            const control = formState.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(event) => onChangeHandler(event, controlName)}
                />
            )
        })

        return inputs
    }
    
    return (
        <div className="Auth">
            <div className="Auth__block">
                <h1>Авторизация</h1>
               
                <form onSubmit={submitHandler} className="Auth__form">
                 
                    { renderInputs() } 
                  
                    <Button 
                        type="success" 
                        onClick={loginHandler}
                        disabled={!formState.isFormValid}
                    >
                        Войти
                    </Button>

                    <Button
                        type="primary" 
                        onClick={registerHandler}
                        disabled={!formState.isFormValid}
                    >
                        Регистрация
                    </Button>
                </form>
            </div>
        </div>
    )
}



export default Auth