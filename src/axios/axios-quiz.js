import axios from 'axios'
import { FIREBASE_BD } from '../db'

export default axios.create({
    baseURL: FIREBASE_BD
})

