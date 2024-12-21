import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitAnswer } from "./quizSlice";

export default function QuestionCard({ question }) {
  const dispatch = useDispatch();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const [showCompletionAlert, setShowCompletionAlert] = useState(false);
  const [completionAlertMessage, setCompletionAlertMessage] = useState("");
  const { questions, wrongAnswersCount, completed } =
    useSelector((state) => state.quiz);

  const handleAnswer = (answer) => {
    if (wrongAnswersCount > 5 || completed) {
      return; 
    }
    dispatch(submitAnswer({ id: question.id, answer }));
  };
  React.useEffect(() => {
    if (wrongAnswersCount > 5) {
      setErrorAlertMessage(
        "You have more than 5 incorrect answers! Please be calm and reload the page and try again. Remember, it's part of the learning process! 🔝"
      )
      setShowErrorAlert(true);
    };
    const timeout = setTimeout(() => setShowErrorAlert(false), 5000); 
    return () => clearTimeout(timeout);
  }, [wrongAnswersCount]);

  React.useEffect(() => {
    const allAnswered = questions.every((q) => q.userAnswer !== undefined); 
    if (allAnswered) {
      const correctAnswersCount = questions.filter(
        (q) => q.userAnswer === q.correctAnswer
      ).length;
      const wrongAnswersCount = questions.length - correctAnswersCount;
  
      setCompletionAlertMessage(
        `Quiz completed! You have ${wrongAnswersCount} wrong answers / ${questions.length} and ${correctAnswersCount} correct answers / ${questions.length}`
      );
      setShowCompletionAlert(true);
      const timeout = setTimeout(() => setShowCompletionAlert(false), 5000); 
      return () => clearTimeout(timeout);
    }
  }, [questions]);
  

  return (
    <div className="card shadow">
      {showErrorAlert && (
        <div className="alert alert-danger text-center" role="alert">
          {errorAlertMessage}
        </div>
      )}
      {showCompletionAlert && (
        <div className="alert alert-primary text-center" role="alert">
          {completionAlertMessage}
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
};
