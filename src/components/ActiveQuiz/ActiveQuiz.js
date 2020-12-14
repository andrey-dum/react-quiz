import React from 'react'

import './ActiveQuiz.css'

import AnswersList from './AnswersList/AnswersList'

export default function ActiveQuiz({
    answers, 
    question, 
    onAnswerClick,
    answerNumber,
    quizLength,
    answerState
}) {
    return (
        <div className="activeQuiz">
            <p className="question">
                <span>
                    <strong>1. </strong>
                    {question}
                </span>

                <small>{answerNumber} из {quizLength}</small>
            </p>

            <AnswersList 
                answers={answers}
                onAnswerClick={onAnswerClick} 
                answerState={answerState}
            />
        </div>
    )
}
