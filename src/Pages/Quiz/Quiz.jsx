import React, { useContext, useState } from 'react';
import video from '../../assets/videos/bg1.mp4'
import { QuizContext } from '../../Context/QuizContext';
import gif from '../../assets/gifs/circleLoading.gif'
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const { quizData, quizSlice, backToHome, isAllowed } = useContext(QuizContext);
  const [index, setIndex] = useState(0);
  const [isShowScore, setIsShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [pickedAnswer, setPickedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [feedback, setFeedback] = useState('');
  //calcute the width of the bar
  const calculatedWidth = Math.floor(100 / quizSlice );
  const [width, setWidth] = useState(0);
  const navigate = useNavigate()

  // Loading state when quizData is not yet available
  if (!quizData || quizData.length === 0) {
    return ( 
      <div className='h-screen w-100 flex flex-col justify-center items-center bg-gradient-to-tr blue red'> 
        <p className='text-3xl font-extrabold  font-white'>Loading...</p> 
       <img className='w-24' src={gif} alt="" />
      </div>
    ) ;
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
      console.log(width);
      
    } else {
      setWidth( width + calculatedWidth )
      setIndex(index + 1);
      setIsDisabled(false);
      setPickedAnswer(null);
      setIsCorrect(null);
      setIsContinue(false);
      setFeedback('');
    }
  };
  const style = {
    buttonstyle : {
    width: `${width}%`,
    }
  }


  const redo =()=>{
    navigate('/')
  }


  if (isShowScore) {
    return  (
    <div className='w-full h-screen flex justify-center items-center'>
       <video autoPlay loop muted id="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='flex flex-col justify-center items-center gap-10 '>
      <p className='text-3xl text-white'>Your score: {score} out of {quizData.length}</p>
      <div className='flex gap-5'>
      <button className='shadow-2xl border-2 border-gray-900 block py-4 px-10 bg-blue-400 text-2xl text-white  rounded-lg hover:bg-blue-700 transition-all duration-75' onClick={redo}>redo</button>
      <button className='shadow-2xl border-2 border-gray-900 block py-4 px-10 bg-blue-400 text-2xl text-white  rounded-lg hover:bg-blue-700 transition-all duration-75' onClick={backToHome}>Back to quiz</button>
      </div>
      </div>
    </div>
  )
  }

  return (
    <div className="container flex justify-center items-center w-full h-screen">
      <video autoPlay loop muted id="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="responsive-box flex flex-col justify-center relative items-center quizpage quiz m-auto rounded-2xl border-2 border-black w-1/2 p-16 bg-blue-300  maxHeightAndWidth2 sm:min-w-md  bg-opacity-35">

      <div className='bg-white w-11/12 h-4 rounded-full p-1 overflow-hidden absolute top-5'>
        <div className={ `bg-blue-700 h-full rounded-full` } style={style.buttonstyle}></div>
      </div>
      
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

  

          {isContinue ? (
            <button
              className="next absolute bottom-0 right-0 text-white w-full p-2 bg-pink-400 border-black border-2 rounded-bl-xl rounded-br-xl hover:bg-blue-800 duration-300"
              onClick={nextQuestion}
            >
              Next Question
            </button>
          ) : (
            <button
              disabled={!pickedAnswer}
              className="absolute check bottom-0 right-0 bg-pink-400 text-white w-full p-2 border-black border-2 rounded-bl-xl rounded-br-xl  hover:bg-blue-800 duration-300 z-40"
              onClick={checkAnswer}
            >
              Check
            </button>
          )}
          
          {feedback && (
            <div className={`${isCorrect ? "bg-blue-600 " : "bg-red-700 "} text-white bottom-12 right-0 transition-all duration-75 p-10  popup absolute  text-center z-10 w-full`}>
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
