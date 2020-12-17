import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

import './QuizList.css'
import { FIREBASE_BD } from '../../db'

export default function QuizList() {

    const [quizes, setQuizes] = React.useState([])

    React.useEffect(() => {
        axios.get(FIREBASE_BD)
        .then(response => {
            const quizList = []
            Object.keys(response.data).forEach((key, index) => {
                quizList.push({
                        id: key,
                        name: `Test #${index + 1}`
                    })
            })

            setQuizes(quizList)

        })
        .catch(e => console.log(e)) 

    }, [quizes])

    const renderQuizes = () => {
        return quizes.map((quiz) => (
            <li 
                key={quiz.id}
            >
                <NavLink
                    to={`/quiz/${quiz.id}`}
                >
                        {quiz.name}
                </NavLink>
            </li>
        ))
    }

    return (
        <div className="QuizList">
            <div className="QuizList__block">
                <h1>Список тестов</h1>

                <ul>
                    { renderQuizes() }
                </ul>
            </div>
            
        </div>
    )
}
