const Vote = require('../models/voting.model');
 
module.exports.getAllVotes = (req, res) => {
    Vote.find()
        .then((allVotes) => {
            res.json({ votes: allVotes })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}
 
module.exports.getOneVote = (req, res) => {
    Vote.findOne({ _id: req.params.id })
        .then(oneSingleVote => {
            res.json({ vote: oneSingleVote })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
 
module.exports.createVote= (req, res) => {
    Vote.create(req.body)
        .then(newlyCreatedVote => {
            res.json({ vote: newlyCreatedVote })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
 
     
       module.exports.getOneAndAddLike = (req, res) => {
        const option = req.body.option;
    
        if (!option) {
            return res.status(400).json({ message: 'Option is required' });
        }
    
        const update = {};
        update[`${option}Votes`] = 1;
    
        Vote.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: update },
            { new: true, runValidators: true }
        )
        .then(updatedVote => {
            if (!updatedVote) {
                return res.status(404).json({ message: 'Vote not found' });
            }
    
            res.json({ vote: updatedVote });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong', error: err });
        });
    };