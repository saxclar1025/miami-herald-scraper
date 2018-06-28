const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content: {
    type: String,
    required: true
  }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;