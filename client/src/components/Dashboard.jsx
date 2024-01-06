import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "../App.css";

const Dashboard = () => {
  const [votes, setVotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/votes")
      .then((res) => {
        setVotes(res.data.votes);
      })
      .catch((err) => {
        setErrorMessage("Your API has some problems");
        console.error(err);
      });
  }, []);


  const mostVoted = votes.slice().sort((a, b) => {
    const totalVotesA = (a.option1Votes || 0) + (a.option2Votes || 0) + (a.option3Votes || 0) + (a.option4Votes || 0);
    const totalVotesB = (b.option1Votes || 0) + (b.option2Votes || 0) + (b.option3Votes || 0) + (b.option4Votes || 0);
    console.log(`Votes A: ${totalVotesA}, Votes B: ${totalVotesB}`);
    return totalVotesB - totalVotesA;
  });
  


console.log('Most Voted:', mostVoted);

  const latestVotes = votes
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <Link
          to={"/vote/create"}
          type="button"
          className="btn btn-outline-primary"
        >
          Create Your Own Poll
        </Link>
      </div>

      <div className="row m-4">
      <div className="col-md-6 bg-light">
  <h3>Top 3 Voted</h3>
  {mostVoted.length > 0 ? (
    mostVoted.slice(0, 3).map((vote, index) => (
      <div className="card mb-3 d-flex flex-row" key={index}>
        <div className="d-flex align-items-center">
          <img
            src="/src/assets/chart.png"
            alt="Example Image"
            style={{ height: "120px", width: "120px" }}
          />
        </div>

        <div className="card-body">
          <p className="card-title">
            <Link to={`/vote/${vote._id}`}>{vote.question}</Link>
          </p>
          <div className="d-flex g-10">
            <p className="card-text">{` ${vote.option1}`}</p>
            <p className="card-text">{` Votes: ${vote.option1Votes}`}</p>
          </div>

          <div className="d-flex g-10">
            <p className="card-text">{` ${vote.option2}`}</p>
            <p className="card-text">{`Votes: ${vote.option2Votes}`}</p>
          </div>

          {vote.option3 && (
            <div className="d-flex g-10">
              <p className="card-text">{` ${vote.option3}`}</p>
              {vote.option3Votes && (
                <p className="card-text">{`Votes: ${vote.option3Votes}`}</p>
              )}
            </div>
          )}

          {vote.option4 && (
            <div className="d-flex g-10">
              <p className="card-text">{` ${vote.option4}`}</p>
              {vote.option4Votes && (
                <p className="card-text">{`Votes: ${vote.option4Votes}`}</p>
              )}
            </div>
          )}

          <p className="card-text">
            {`Created At: ${moment(vote.createdAt).fromNow()}`}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p>No most voted votes available. </p>
  )}
</div>


        <div className="col-md-6 bg-light">
          <h3>Latest Votes</h3>
          {latestVotes.length > 0 ? (
            latestVotes.map((vote, index) => (
              <div className="card mb-3 d-flex flex-row" key={index}>
                <div className="d-flex align-items-center">
                  <img
                    src="/src/assets/chart.png"
                    alt="Example Image"
                    style={{ height: "120px", width: "120px" }}
                  />
                </div>
                <div className="card-body">
                  <p className="card-title">
                    <Link to={`/vote/${vote._id}`}>{vote.question}</Link>
                  </p>
                  <div className="d-flex g-10">
                    <p className="card-text">{` ${vote.option1}`}</p>

                    <p className="card-text">{` Votes: ${vote.option1Votes}`}</p>
                  </div>

                  <div className="d-flex g-10">
                    <p className="card-text">{` ${vote.option2}`}</p>
                    <p className="card-text">{`Votes: ${vote.option2Votes}`}</p>
                  </div>
                  {vote.option3 && (
                    <div className="d-flex g-10">
                      <p className="card-text">{` ${vote.option3}`}</p>
                      {vote.option3Votes && (
                        <p className="card-text">{`Votes: ${vote.option3Votes}`}</p>
                      )}
                    </div>
                  )}

                  {vote.option4 && (
                    <div className="d-flex g-10">
                      <p className="card-text">{` ${vote.option4}`}</p>
                      {vote.option4Votes && (
                        <p className="card-text">{`Votes: ${vote.option4Votes}`}</p>
                      )}
                    </div>
                  )}

                  <p className="card-text">
                    {`Created At: ${moment(vote.createdAt).fromNow()}`}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No latest votes available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
