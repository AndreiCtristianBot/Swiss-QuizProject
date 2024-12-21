import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionCard from "./QuestionCard";
import { loadQuestions } from "./quizSlice";

export default function App() {
  const imageStyle = {
    width: "100%",
    height: "300px", // Fixed height
    objectFit: "cover",
  };

  const {
    questions,
    isLoading,
    hasError,
    completed,
    correctAnswersCount,
  } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQuestions());
  }, [dispatch]);

  if (completed && correctAnswersCount === 20) {
    return (
      <div className="text-center mt-4">
        <h2 className="text-success">Quiz Completed!</h2>
        <p>Total Correct Answers: {correctAnswersCount} / {questions.length}</p>
        <div
          className="alert alert-success text-center mt-4"
          style={{ fontSize: "30px" }}
          role="alert"
        >
          Congratulations !!! 👏🥳🚀
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Something went wrong. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <img
        src="https://www.thetrainline.com/cms/media/1237/switzerland_mobile.jpg"
        alt="Switzerland"
        style={imageStyle}
      />
      <div className="container py-4">
        <h1 className="text-center mb-4">Swiss Quiz</h1>
        <div className="row">
          {questions.map((q) => (
            <div className="col-md-6 mb-4" key={q.id}>
              <QuestionCard question={q} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


