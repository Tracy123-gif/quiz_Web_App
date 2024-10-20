import React, { useContext, useState } from 'react';
import { QuizContext } from '../../Context/QuizContext';
import {
  ChakraProvider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';

const Quiz = () => {
  const { quizData } = useContext(QuizContext);
  const [index, setIndex] = useState(0);
  const [isShowScore, setIsShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [pickedAnswer, setPickedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isContinue, setIsContinue] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Loading state when quizData is not yet available
  if (!quizData || quizData.length === 0) {
    return <p>Loading...</p>;
  }

  const question = quizData[index]?.question;
  const correctAnswer = quizData[index]?.correct_answer;
  const incorrectAnswers = quizData[index]?.incorrect_answers;

  // Combine correct and incorrect answers
  const options = [...incorrectAnswers, correctAnswer].sort();

  const handleQuiz = (option) => {
    setPickedAnswer(option);
    setIsDisabled(true);
  };

  const checkAnswer = () => {
    // Check if the selected answer is correct
    if (pickedAnswer === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
      setFeedback('Hurray, you got it right!');
    } else {
      setIsCorrect(false);
      setFeedback('Oops, you got it wrong.');
    }

    // Show feedback and open modal
    setIsContinue(true);
  
  };

  const nextQuestion = () => {
    if (index === quizData.length - 1) {
      setIsShowScore(true);
    } else {
      setIndex(index + 1);
      setIsDisabled(false);
      setPickedAnswer(null);
      setIsCorrect(null);
      setIsContinue(false);
      setFeedback('');
    }
  };

  if (isShowScore) {
    return <p>Your score: {score} out of {quizData.length}</p>;
  }

  return (
    <div className="container flex justify-center items-center w-full h-screen">
      <div className="responsive-box quiz m-auto rounded-2xl border-2 border-black w-1/2 p-16 bg-red-500 maxHeightAndWidth2 sm:min-w-md">
        <h2 className="text-balance mb-2 w-full text-center text-white">{question}</h2>

        <div className="buttons flex flex-col maxHeightAndWidth text-xl text-center overflow-hidden">
          {options.map((option, key) => (
            <button
              disabled={isDisabled}
              className="optionButton bg-white font-bold w-full my-3 p-4 border-black border-2 rounded-xl hover:bg-blue-800 duration-300"
              key={key}
              onClick={() => handleQuiz(option)}
            >
              {option}
            </button>
          ))}  

          <lord-icon
            src="https://cdn.lordicon.com/ohfmmfhn.json"
            trigger="hover"
            colors="primary:#121331,secondary:#08a88a"
            style={{ width: '100px', height: '100px' }}
          ></lord-icon>

          {isContinue ? (
            <button
              className="next absolute bottom-0 right-0 bg-gray-900 text-white w-full p-2 border-black border-2 rounded-xl hover:bg-blue-800 duration-300"
              onClick={nextQuestion}
            >
              Next Question
            </button>
          ) : (
            <button
              disabled={!pickedAnswer}
              className="absolute check bottom-0 right-0 bg-green-600 text-white w-full p-2 border-black border-2 rounded-xl hover:bg-blue-800 duration-300 z-40"
              onClick={checkAnswer}
            >
              Check
            </button>
          )}
          
          {feedback && (
            <div className={`${isCorrect ? "bg-blue-600 " : "bg-red-700 "} bottom-12 right-0 transition-all duration-75 p-10  popup absolute  text-center z-10 w-full`}>
              <div className="popupContent">
                {feedback}
              </div>
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Quiz;
