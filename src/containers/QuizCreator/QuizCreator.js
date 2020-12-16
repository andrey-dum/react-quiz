import React from 'react'
import classes from './QuizCreator.module.css'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { createControl } from '../../form/formFramework'

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {required: true})
}

function createFromControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1), 
        option2: createOptionControl(2), 
        option3: createOptionControl(3), 
        option4: createOptionControl(4)
    }
}

export default function QuizCreator() {
    const [formState, setFormState] = React.useState({
        quiz: [],
        formControls: createFromControls()

    })

    

    const submitHandler = (e) => {
        e.preventDefault()
    }

    const AddQuestionHandler = () => {
       
    }

    const createQuizHandler = () => {
       
    }

    const changeHandler = (value, controlName) => {

    }

    const renderControls = () => {
        return Object.keys(formState.formControls).map((controlName, index) => {
            const control = formState.formControls[controlName]

            return (
                <>
                    <Input
                        key={controlName + index}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null }
                </>
            )
        })
    }

    return (
        <div className={classes.QuizCreator}>
            <div className={classes.QuizCreatorBlock}>
                <h1>QuizCreator</h1>
                <form onSubmit={submitHandler} className={classes.QuizCreatorForm}>

                { renderControls() }

                <select></select>
                <Button
                    type="primary"
                    onClick={AddQuestionHandler}
                
                >
                    Добавить вопрос
                </Button>
                <Button
                    type="success"
                    onClick={createQuizHandler}
                >
                    Создать тест
                </Button>
                </form>
            </div>
        </div>
    )
}
