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

  comments: [
    {
      type: Schema.types.ObjectId,
      ref: "Comment"
    }
  ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;