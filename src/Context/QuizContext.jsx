import  { useContext, useEffect, useState, createContext } from 'react'
import axios from 'axios'

export const QuizContext = createContext()

const QuizProvider = ({children}) =>{
    const [quizData, setQuizData ] = useState([])

    useEffect(()=>{
    axios.get('https://opentdb.com/api.php?amount=40&category=9&difficulty=medium' ).then( res => 
        { 
            
            const data = (res.data.results)
            console.log(data)
            setQuizData(data)
        } ).catch( err => { console.log(err.message)})
    }, [])

    return (
        <QuizContext.Provider value={{quizData}}>
            {children}
        </QuizContext.Provider>
    )


}
export default QuizProvider;