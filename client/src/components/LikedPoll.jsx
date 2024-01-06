import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LikedPoll = (props) => {
  const [vote, setVote] = useState({});
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/vote/${id}`)
      .then((res) => {
        console.log("resdata", res.data);
        setVote(res.data.vote);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setErrorMessage("Error fetching product");
      });
  }, [id]);

  return (
    <div className="form px-3">
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-outline-primary" onClick={navigateBack}>
          Go Back
        </button>
      </div>
      <div style={{height:"350px"}} className=" card  bg-light text-black">
      <p className="bg-success d-flex justify-content-center p-2">Thanks for voting there is the result</p>
      <h1 className="text-center p-2">{vote.question}</h1>
      {errorMessage ? <p className="red text-center">{errorMessage}</p> : null}
 
      <div className="card d-flex flex-row bg-secondary text-white g-10">

        <div className="card-body">
          <h5 className="card-title"> {vote.option1}</h5>
  
          <p className="card-text">{`Votes: ${vote.option1Votes}`}</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">  {vote.option2}</h5>
       
          <p className="card-text">{`Votes: ${vote.option2Votes}`}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LikedPoll;
