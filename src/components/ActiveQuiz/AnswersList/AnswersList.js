import React from 'react'
import AnswerItem from './AnswerItem/AnswerItem'
import './AnswersList.css'

export default function AnswersList({
    answers, 
    onAnswerClick,
    answerState
}) {
    return (
        <ul className="answers__list">
            { answers && answers.map((answer, index) => (
                <AnswerItem
                    key={index} 
                    answer={answer}
                    onAnswerClick={onAnswerClick}
                    answerState={answerState ? answerState[answer.id]: null} 
                />
            )) }
        </ul>
    )
}
