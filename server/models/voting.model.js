const mongoose = require("mongoose");
const VoteSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      minlength: [10, "The quesion should be more than 10 characters"],
      required: [true, "The quesion is required"],
      unique: true
    },
    option1: {
      type: String,
      minlength: [5, "The text should be more than 5 characters"],
      required: [true, "The text content is required"],
    },
    option2: {
      type: String,
      minlength: [5, "The text should be more than 5 characters"],
      required: [true, "The text is required"],
    },
    option3: {
      type: String,
    },
    option4: {
      type: String,
    },
    option1Votes: {
      type: Number,
      default: 0,
    },
    option2Votes: {
      type: Number,
      default: 0,
    },
  
  },
  { timestamps: true }
);
module.exports = mongoose.model("Vote", VoteSchema);
