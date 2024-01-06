import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const SinglePoll = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [vote, setVote] = useState({});
  const [countVote, setCountVote] = useState(0);

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/vote/${id}`)
      .then((res) => {
        setVote(res.data.vote);
      })
      .catch((err) => {
        setErrorMessage("Your api has some problems");
        console.log(err);
      });
  }, [id]);

  const handleVote = (selectedOption) => {
    axios
      .patch(`http://localhost:8000/api/vote/like/${id}`, {
        option: selectedOption,
      })
      .then((res) => {
        console.log(
          `Vote count updated ${selectedOption}:`,
          res.data.vote[selectedOption + "Votes"]
        );
        setCountVote((prevCount) => prevCount + 1);
      })
      .catch((err) => {
        console.error("Error updating vote count:", err);
      });
  };

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-end mb-2">
          <button className="btn btn-outline-primary" onClick={navigateBack}>
            Go Back
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <h2>What is Better?</h2>
        </div>

        <p className="d-flex justify-content-center card-title">
          {vote.question}
        </p>

        <div className="bg-secondary d-flex m-4 g-10 p-2">
          <div className="col-md-6 m-2">
            <div style={{ height: "200px" }} className="card">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <p className="card-title">{vote.option1}</p>

                <button
                  className="btn btn-warning border border-5"
                  onClick={() => handleVote("option1")}
                >
                  <Link to={`/vote/edit/${vote._id}`}>
                    Vote for {vote.option1}
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 m-2">
            <div style={{ height: "200px" }} className="card">
              <div className="card-body d-flex flex-column align-items-center  justify-content-center">
                <p className="card-title">{vote.option2}</p>

                <button
                  className="btn btn-danger border border-5"
                  onClick={() => handleVote("option2")}
                >
                  <Link to={`/vote/edit/${vote._id}`}>
                    Vote for {vote.option2}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePoll;
