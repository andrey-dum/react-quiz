import React from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

import './Quiz.css'

const quizList = {
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' 'error' }
    quiz: [
        {
            id: 1,
            question: 'What is the capital of Chile?',
            rightAnswerId: 1,
            answers: [
                {text: 'Santiago', id: 1},
                {text: 'London', id: 2},
                {text: 'Barcelona.', id: 3},
                {text: 'Question 4', id: 4},
            ]
        },
        {
            id: 2,
            question: 'W2222222222',
            rightAnswerId: 2,
            answers: [
                {text: '111', id: 1},
                {text: '222', id: 2},
                {text: '333.', id: 3},
                {text: '44444 4', id: 4},
            ]
        }
    ]
}

function Quiz() {
 

    const [state, setState] = React.useState(quizList)

    const isQuizFinished = () => {
        return state.activeQuestion + 1 === state.quiz.length
    }

    const onAnswerClickHandler = (answerId) => {
        const question = state.quiz[state.activeQuestion]

        if (question.rightAnswerId === answerId) {
            setState({
                ...state,
                answerState: {[answerId]: 'success'}
            })

            const timeout = window.setTimeout(() => {
                if (isQuizFinished()) {
                    console.log('Quiz Finished');
                } else {
                    setState({
                        ...state,
                        activeQuestion: state.activeQuestion + 1,
                        answerState: null
                    })

                }

                window.clearTimeout(timeout)
            },
            1000)
            
        } else {
            console.log('Answer is Wrong');
            setState({
                ...state,
                answerState: {[answerId]: 'error'}
            })
        }
    }
    console.log(state);
    return (
        <div className="quiz">
           
            <div className="quiz__block">
                <h1>Quiz</h1>
                <ActiveQuiz 
                    answers={state.quiz[state.activeQuestion].answers} 
                    question={state.quiz[state.activeQuestion].question}
                    onAnswerClick={onAnswerClickHandler}
                    quizLength={state.quiz.length}
                    answerNumber={state.activeQuestion + 1}
                    answerState={state.answerState}
                />
            </div>
        </div>
    )
}

export default Quiz
