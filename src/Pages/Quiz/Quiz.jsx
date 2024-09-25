import React, { useContext, useState } from 'react';
import { QuizContext } from '../../Context/QuizContext';

const Quiz = () => {
  const { quizData } = useContext(QuizContext);
  const [index, setIndex] = useState(0);
  const [isShowScore, setIsShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [pickedAnswer, setPickedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Check if quizData is loaded and contains items
  if (!quizData || quizData.length === 0) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  // Get the current question and answers
  const question = quizData[index]?.question;
  const correctAnswer = quizData[index]?.correct_answer;
  const incorrectAnswers = quizData[index]?.incorrect_answers;
  //const [ isDisabled, setIsDosabled ] = useState(true)

  // Combine correct and incorrect answers for the options
  const options = [...incorrectAnswers, correctAnswer].sort();

  const handleQuiz = (option) => {
    setPickedAnswer(option);

    // Check if the selected answer is correct
    if (option === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    // Check if it's the last question
    if (index === quizData.length - 1) {
      setIsShowScore(true);
    } else {
      // Move to the next question
      setIndex(index + 1);
    }
  };

  if (isShowScore) {
    return <p>Your score: {score} out of {quizData.length}</p>;
  }

  return (
    <div className="container  flex justify-center items-center w-vw h-screen">
        {/* <h1 className="h1 bg-blue-500 text-white p-4 w-full">Quiz Game</h1> */}
      <div className="quiz m-auto rounded-2xl border-2 border-black w-1/2 p-20 bg-red-500">
      


        <h2 className='text-2xl m-auto w-full text-center text-white'>{question}</h2>

        <div className="buttons  p-5 flex flex-col gap-5 w-full  maxHeightAndWidth m-auto text-2xl">
          {options.map((option, key) => (
            <button
              className="optionButton bg-blue-500 buttonOption w-full m-auto p-2 border-black border-2 rounded-md hover:bg-blue-800 duration-300 "
              key={key}
              onClick={() => handleQuiz(option)}
            >
              {option}
            </button>
            
          ))}
          <button className='optionButton bg-blue-500 buttonOption w-full m-auto p-2 border-black border-2 rounded-md hover:bg-blue-800 duration-300 '>Continue</button>
        </div>
        {/* {isCorrect !== null && (
          <p>{isCorrect ? 'Correct!' : 'Incorrect, try again!'}</p>
        )} */}
      </div>
    </div>
  );
};

export default Quiz;
