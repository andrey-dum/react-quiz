import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../../store/actions/auth'


export default function Logout() {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(logout())
    }, [dispatch])
    
    return (
        <Redirect to="/" />
    )
}
