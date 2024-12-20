import React from "react";
import { useDispatch } from "react-redux";
import { submitAnswer } from "./quizSlice";

function QuestionCard({ question }) {
  const dispatch = useDispatch();

  const handleAnswer = (answer) => {
    dispatch(submitAnswer({ id: question.id, answer }));
  };

  return (
    <div className="card shadow">
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
