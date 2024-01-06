import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePoll = (porps) => {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigateBack = () => {
    navigate(-1);
  };

  const createVote = (e) => {
    e.preventDefault();

    if (question.length < 2 || option1.length < 2) {
      setErrorMessage("your Form have some issues");
    } else {
      axios
        .post("http://localhost:8000/api/vote", {
          question,
          option1,
          option2,
          option3,
          option4,
        })
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          setErrorMessage("Your api have some problems");
          console.log(err);
        });
    }
  };

  return (
    <div className="form px-3">
      <div className="d-flex justify-content-end mb-2">
        <Link to={"/"} type="button" className="btn btn-outline-primary">
          Back to home
        </Link>
      </div>

      <h1 className="text-center p-2"> Create Vote</h1>
      {errorMessage ? (
        <p className="red text-center "> {errorMessage}</p>
      ) : null}

      <form
        className="w-100 m-auto p-3  bg-light text-dark"
        onSubmit={(e) => createVote(e)}
      >
        <div className="  row">
          <div className="col-md-6">
            <label className="form-label">Question</label>
            <textarea
              className="form-control"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {question.length > 0 && question.length < 10 ? (
              <p className="text-danger">
                The question should be more than 10 char
              </p>
            ) : null}
          </div>
          <div className="col-md-6">
            <label className="form-label">Option 1</label>
            <input
              className="form-control"
              type="text"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />
            {option1.length > 0 && option1.length < 5 ? (
              <p className="text-danger">
                The option 1 should be more than 5 char
              </p>
            ) : null}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
          </div>
          <div className="col-md-6">
            <label className="form-label">Option 2</label>
            <input
              className="form-control"
              type="text"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />
            {option2.length > 0 && option2.length < 5 ? (
              <p className="text-danger">
                The option 2 should be more than 5 char
              </p>
            ) : null}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
          </div>
          <div className="col-md-6">
            <label className="form-label">Option 3</label>
            <input
              className="form-control"
              type="text"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
          </div>
          <div className="col-md-6">
            <label className="form-label">Option 4</label>
            <input
              className="form-control"
              type="text"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <button style={{ width: "95%" }} className="btn btn-success mt-2">
            Create this Vote
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreatePoll;
