import React from 'react'
import {QuizContext} from '../Context/QuizContext'
import {Navigate} from 'react-router-dom'
import { useContext } from 'react'

const ProtectedQuiz = ({children}) => {

    const {isAllowed} = useContext(QuizContext)
    console.log(isAllowed);
    
    return isAllowed
        ? children
        : <Navigate to={'/quizGame'}/>;
}

export default ProtectedQuiz
