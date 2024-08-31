import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import './Quizpage.css'; // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { handleScoreChange } from '../redux/actions';
import { decode } from 'html-entities';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Quizpage = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    score,
  } = useSelector((state) => state.quiz);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=10`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  console.log("API URL:", apiUrl);
  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState(15); // Timer state

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer > 0 ? prevTimer - 1 : 0);
    }, 1000);

    // If the timer reaches 0, move to the next question or end the quiz
    if (timer === 0) {
      handleTimeUp();
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleTimeUp = () => {
    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
      setTimer(15); // Reset timer for the next question
    } else {
      navigate("/score");
    }
  };

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
      setTimer(15); // Reset timer for the next question
    } else {
      navigate("/score");
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-quizpage">
      <h4 className="heading">Question {questionIndex + 1}</h4>
      <p className="question">{decode(response.results[questionIndex].question)}</p>
      <div className="timer">Time Remaining: {timer} seconds</div> {/* Display the timer */}
      {options.map((data, id) => (
        <div className="answer-container" key={id}>
          <button className="button contained-button" onClick={handleClickAnswer}>{decode(data)}</button>
        </div>
      ))}
      <div className="score">Score: {score} / {response.results.length}</div>
    </div>
  );
};

export default Quizpage;
