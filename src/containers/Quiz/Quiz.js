import React from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import Finished from '../../components/ActiveQuiz/Finished/Finished'

import './Quiz.css'

const quizList = {
    results: {}, //  {[id]: success || error },
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' 'error' }
    quiz: [
        {
            id: 1,
            question: 'What is the hottest continent on Earth??',
            rightAnswerId: 3,
            answers: [
                {text: 'Ukraine', id: 1},
                {text: 'England', id: 2},
                {text: 'Africa', id: 3},
                {text: 'Italy', id: 4},
            ]
        },
        {
            id: 2,
            question: 'Where would you find the River Thames?',
            rightAnswerId: 1,
            answers: [
                {text: 'London, UK', id: 1},
                {text: 'Russia', id: 2},
                {text: 'Africa', id: 3},
                {text: 'Canada', id: 4},
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
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            setState({
                ...state,
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (isQuizFinished()) {
                    console.log('Quiz Finished');
                    setState({
                        ...state,
                        isFinished: true
                    })
                } else {
                    setState({
                        ...state,
                        activeQuestion: state.activeQuestion + 1,
                        answerState: null
                    })

                }

                window.clearTimeout(timeout)
            }, 1000)
            
        } else {
            console.log('Answer is Wrong');

            results[question.id] = 'error'
            setState({
                ...state,
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }
    console.log(state);

    const retryHandler = () => {
        setState({
            ...state,
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
      }

    return (
        <div className="quiz">
           
            <div className="quiz__block">
                <h1>Quiz Planet</h1>
                { state.isFinished 
                    ? <Finished
                        results={state.results}
                        quiz={state.quiz}
                        onRetry={retryHandler}
                     />
                    : <ActiveQuiz 
                        answers={state.quiz[state.activeQuestion].answers} 
                        question={state.quiz[state.activeQuestion].question}
                        onAnswerClick={onAnswerClickHandler}
                        quizLength={state.quiz.length}
                        answerNumber={state.activeQuestion + 1}
                        answerState={state.answerState}
                    />
                }
                
            </div>
        </div>
    )
}

export default Quiz
