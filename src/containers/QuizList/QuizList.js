import React from 'react'
import { NavLink } from 'react-router-dom'

import './QuizList.css'

export default function QuizList() {

    const renderQuizes = () => {
        return [1, 2, 3].map((quiz, index) => (
            <li key={index}>
                <NavLink
                    to={`/quiz/${quiz}`}
                >
                        quiz {quiz}
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
