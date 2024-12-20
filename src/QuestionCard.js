import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitAnswer } from "./quizSlice";


function QuestionCard({ question }) {
  const dispatch = useDispatch();
  const wrongAnswersCount = useSelector((state) => state.quiz.wrongAnswersCount);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAnswer = (answer) => {
    if (wrongAnswersCount > 5) {
      return; 
    }
    dispatch(submitAnswer({ id: question.id, answer }));
  };
  React.useEffect(() => {
    if (wrongAnswersCount > 5) {
      setAlertMessage(
        "You have more than 5 incorrect answers! Please be calm and reload the page and focus again. Don't forget that it's part of the learning proces🔝"
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 100000000000000000000); 
    }
  }, [wrongAnswersCount]);

  return (
    <div className="card shadow">
      {showAlert && (
        <div className="alert alert-danger" role="alert">
          {alertMessage}
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title">{question.question}</h5>
        <div>
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`btn ${
                question.userAnswer
                  ? option === question.correctAnswer
                    ? "btn-success"
                    : option === question.userAnswer
                    ? "btn-danger"
                    : "btn-outline-secondary"
                  : "btn-outline-primary"
              } m-1`}
              disabled={!!question.userAnswer}
            >
              {option}
            </button>
          ))}
        </div>
        {question.userAnswer && (
          <p
            className={`mt-2 ${
              question.userAnswer === question.correctAnswer
                ? "text-success"
                : "text-danger"
            }`}
          >
            {question.userAnswer === question.correctAnswer
              ? "Your answer is correct!"
              : "Your answer is wrong, try again! It's part of the learning process!"}
          </p>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;
