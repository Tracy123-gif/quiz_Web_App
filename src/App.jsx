import React from 'react'
import Quiz from './Pages/Quiz/Quiz'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProtectedQuiz from './ProtectedRoutes/ProtectedQuiz'
import QuizForm from './Pages/Quiz/QuizForm'

const App = () => {
  return (
    <div> 
    <Router>
      <Routes>
        <Route path='/' element={<QuizForm />}/>
        <Route path='/quizGame' element={<ProtectedQuiz><Quiz/> </ProtectedQuiz>} />
      </Routes>
    </Router>
    
    </div>
  )
}

export default App
