import React, {useState} from 'react'
import classes from './QuizCreator.module.css'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { createControl, validate, validateForm } from '../../form/formFramework'
import Select from '../../components/UI/Select/Select'
import axios from '../../axios/axios-quiz'


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
    const [formState, setFormState] = useState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFromControls()

    })

    

    const submitHandler = (e) => {
        e.preventDefault()
    }

    const addQuestionHandler = (e) => {
        e.preventDefault()

        const quiz = formState.quiz
        const index = quiz.length + 1

        const {question, option1, option2, option3, option4} = formState.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: formState.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        quiz.push(questionItem)

        setFormState({
            ...formState,
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFromControls()
        })


    }

    const createQuizHandler = async (e) => {
        e.preventDefault()
      
        // axios.post('https://react-quiz-1bf15-default-rtdb.firebaseio.com/quizes.json', formState.quiz)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => console.log(error))

        try {
            await axios.post('/quizes.json', formState.quiz)
            setFormState({
                ...formState,
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFromControls()
            })
        } catch (error) {
            console.log(error)
        }
    }

    const changeHandler = (value, controlName) => {
        const formControls = {...formState.formControls}
        const control = {...formControls[controlName]}

        control.value = value
        control.touched = true
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        setFormState({
            ...formState,
            formControls,
            isFormValid: validateForm(formControls)
        })


    }
   

    const renderControls = () => {
        return Object.keys(formState.formControls).map((controlName, index) => {
            const control = formState.formControls[controlName]

            return (
               
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
                    // { index === 0 ? <hr /> : null }
               
            )
        })
    }

    const selectChangeHandler = (event) => {
        console.log(event.target.value);
        setFormState({
            ...formState,
            rightAnswerId: +event.target.value
        })
    }

    const select = <Select
        label="Выберите правильный ответ"
        value={formState.rightAnswerId}
        onChange={selectChangeHandler}
        options={[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4}
        ]}
    />

    return (
        <div className={classes.QuizCreator}>
            <div className={classes.QuizCreatorBlock}>
                <h1>QuizCreator</h1>
                <form onSubmit={submitHandler} className={classes.QuizCreatorForm}>

                    { renderControls() }

                    { select }

                    <Button
                        type="primary"
                        onClick={addQuestionHandler}
                        disabled={!formState.isFormValid}
                    
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                        type="success"
                        onClick={createQuizHandler}
                        disabled={formState.quiz.length === 0}
                    >
                        Создать тест
                    </Button>
                </form>
            </div>
        </div>
    )
}
