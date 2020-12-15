import React from 'react'
import './Finished.css'


export default function Finished({results, quiz, onRetry}) {
    const successCount = Object.keys(results).reduce((total, key) => {
        if (results[key] === 'success') {
            total++
        }

        return total
    }, 0)

    return (
        <div className="finished">
            <ul>
                { quiz.map((q, index) => {
                    const cls = [
                        'fa',
                        results[q.id] === 'error' ? 'fa-times' : 'fa-check',
                        results[q.id],
                    ]
                    
                    return (
                        <li key={index}>
                            <strong>{index + 1}. </strong>
                            { q.question }
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                }) }
                
               
            </ul>

            <p>Правильно {successCount} из {quiz.length}</p>

            <div>
                <button onClick={onRetry}>Повторить</button>
            </div>
        </div>
    )
}
