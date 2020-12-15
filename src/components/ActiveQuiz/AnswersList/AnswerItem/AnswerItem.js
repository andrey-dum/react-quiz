import React from 'react'
import './AnswerItem.css'

const AnswerItem = ({
    answer, 
    onAnswerClick,
    answerState
}) => {
    return (
        <li 
            className={`AnswerItem ${answerState ? answerState : ''}`}
            onClick={() => onAnswerClick(answer.id)}
        >
            {answer.text}
        </li>
    )
}


export default AnswerItem