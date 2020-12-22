import React from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import Finished from '../../components/Finished/Finished'
import Loader from '../../components/UI/Loader/Loader'

import { useDispatch, useSelector } from 'react-redux'

import './Quiz.css'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz'

function Quiz({match}) {

    const dispatch = useDispatch()
    const state = useSelector(state => state.quiz)

    React.useEffect(() => {
        dispatch(fetchQuizById(match.params.id)) 
        
        //if nedd
        return () => { dispatch(retryQuiz()) }
    }, [dispatch, match.params.id])
    
    const onAnswerClickHandler = (answerId) => {
        dispatch(quizAnswerClick(answerId))
    }

    const retryHandler = () => {
       dispatch(retryQuiz())
      }

    return (
        <div className="quiz">
           
            <div className="quiz__block">
                <h1>Quiz Planet</h1>

                {
                    state.loading || !state.quiz
                    ? <Loader /> 
                    : state.isFinished 
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
