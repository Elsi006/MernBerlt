const VoteController = require('../controllers/voting.controller');
module.exports = (app) => {
  
    app.get('/api/votes', VoteController.getAllVotes);
    app.post('/api/vote', VoteController.createVote);
    app.get('/api/vote/:id', VoteController.getOneVote);
    app.patch('/api/vote/like/:id', VoteController.getOneAndAddLike);
   
}

