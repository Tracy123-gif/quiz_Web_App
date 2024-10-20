import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../../Context/QuizContext';
import { useNavigate } from 'react-router-dom';

const QuizForm = () => {
  const { handleQuizStart, setQuizSlice, quizSlice, isAllowed } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    let inputValue = event.target.value;
    setQuizSlice(inputValue); // Set the number of questions
    console.log('Selected number of questions:', inputValue);
  };

  useEffect(() => {
    if (isAllowed) {
      navigate('/quizGame'); // Navigate to the protected route when allowed
    }
  }, [isAllowed, navigate]);

  return (
    <div className="h-screen w-full bg-blue-300 m-auto grid quizFormCon">
      <div className="py-40">
        <div className="card w-1/2 h-inherit m-auto border-2 border-black shadow-2xl bg-white p-10 flex flex-col justify-center items-center gap-10">
          <div className="header">
            <h1 className="text-4xl font-extrabold text-blue-600 text-clip">Let's Start the Quiz</h1>
          </div>
          <div className="para w-4/6">
            <p>Welcome to Quizzo, a place where you have fun while learning. Test your knowledge with various interesting questions.</p>
          </div>
        </div>
      </div>

      <div className="form">
        <form onSubmit={handleQuizStart} className="flex gap-4 flex-col w-1/2 m-auto text-xl">
          <label htmlFor="quizAmount">Put in the amount of Questions you'd like to answer below</label>
          <select id="quizAmount" onChange={handleChange}>
            <option>--select option--</option>
            <option value="6">6</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>
          <button className="bg-red-600 text-white p-1 border-black border-2 rounded-full" type="submit">
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
