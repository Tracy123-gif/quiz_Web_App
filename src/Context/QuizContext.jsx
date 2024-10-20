import { useContext, useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState([]);
  const [isAllowed, setIsAllowed] = useState(false);
  const [quizSlice, setQuizSlice] = useState(''); // Stores number of questions

  const handleQuizStart = (event) => {
    event.preventDefault(); // Correct this line
    if (quizSlice) {
      setIsAllowed(true); // Only start if a number of questions is selected
      console.log('Starting quiz with', quizSlice, 'questions');
    } else {
      alert("Please select a number of questions");
    }
  };

  useEffect(() => {
    if (isAllowed && quizSlice) {
      axios
        .get(`https://opentdb.com/api.php?amount=${quizSlice}&category=9&difficulty=medium`)
        .then((res) => {
          const data = res.data.results;
          console.log(data);
          setQuizData(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [isAllowed, quizSlice]); // Fetch quiz data when allowed and quizSlice is set

  return (
    <QuizContext.Provider value={{ quizData, isAllowed, handleQuizStart, quizSlice, setQuizSlice }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
