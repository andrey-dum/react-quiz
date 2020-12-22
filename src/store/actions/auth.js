import axios from "axios";
import { API_KEY } from '../../db'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function auth (email, password, isLogin) {
    return async dispatch => {
         const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url;

        if (isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        }

        try {
            const response = await axios.post(url, authData)
            const data = response.data

            const experationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('experationDate', experationDate)
            
            dispatch(authSuccess(data.idToken))

            dispatch(autoLogout(data.expiresIn))

        } catch (error) {
            console.log(error);
        } 
    }
}

export function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId',)
        localStorage.setIremoveItemtem('experationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    } 
}
