import React from 'react'
import { NavLink } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import './QuizList.css'
import Loader from '../../components/UI/Loader/Loader'
import { fetchQuizes } from '../../store/actions/quiz'

export default function QuizList() {

    // const [quizes, setQuizes] = React.useState([])
    // const [loading, setLoading] = React.useState(true)

    const dispatch = useDispatch()
    const state = useSelector(state => state.quiz)

    React.useEffect(() => {
        dispatch(fetchQuizes())
        // axios.get('/quizes.json')
        // .then(response => {
        //     const quizList = []
        //     Object.keys(response.data).forEach((key, index) => {
        //         quizList.push({
        //                 id: key,
        //                 name: `Test #${index + 1}`
        //             })
        //     })

        //     setQuizes(quizList)
        //     setLoading(false)
        // })
        // .catch(e => console.log(e)) 

    }, [dispatch])

    const quizes = state.quizes
    const loading = state.loading

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
                { loading && quizes.length !== 0
                    ? <Loader />
                    : <ul>
                            { renderQuizes() }
                        </ul>
                }
                
            </div>
            
        </div>
    )
}
