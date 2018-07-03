const path = require("path");

module.exports = (app, db) => {
  app.get("/saved", (req,res)=>{
    db.Article.find({})
    .populate("comments")
    .then(dbArticles=>{
      res.render("saved", dbArticles);
    })
    .catch(err=>{
      res.end(404);
    });
  });

  app.get("/*", (req,res)=>{
    // res.sendFile(path.join(__dirname, "../public/index.html"));
    db.Article.find({})
    .populate("comments")
    .then(dbArticles=>{
      res.render("index", dbArticles);
    })
    .catch(err=>{
      res.end(404);
    });
  });
}