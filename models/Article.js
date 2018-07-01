const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  summary: {
    type: String
  },

  url: {
    type: String,
    required: true
  },

  articleID: {
    type: Number,
    required: true,
    index: true,
    unique: true
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;