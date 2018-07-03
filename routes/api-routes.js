const cheerio = require("cheerio");
const axios = require("axios");

module.exports = (app, db) => {
  //scrapes local news articles and returns them in JSON format
  app.get("/api/scrape", (req,res)=>{
    axios.get("https://www.miamiherald.com/news/local/")
    .then(response=>{
      const $ = cheerio.load(response.data);

      var articles = [];

      articles.push({
        title: $("#mainstage-sectionfront .title a").text().trim(),
        summary: $("#mainstage-sectionfront p").text(),
        url: $("#mainstage-sectionfront .title a").attr("href"),
        articleID: $("#mainstage-sectionfront .title a").attr("href").match(/article(\d+)/)[1]
      });

      $("#story-list article").each(function(i, element){
        articles.push({
          title: $(this).find(".title a").text().trim(),
          summary: $(this).find("p").text().trim(),
          url: $(this).find(".title a").attr("href"),
          articleID: $(this).find(".title a").attr("href").match(/article(\d+)/)[1]
        });
      });

      // articles.forEach(article=>{
      //   db.Article.create(article)
      //   .then(dbArticle=>{console.log(dbArticle)})
      //   .catch(err=>{console.log(err)});
      // });

      res.json(articles);
    });
  });

  //creates a new article in the database
  //expects an object:
  //{
  //  title: String,
  //  summary: String,
  //  url: String,
  //  articleID: String
  //}
  app.post("/api/articles", (req,res)=>{
    db.Article.create(req.body)
    .then(dbArticle=>{
      res.json(dbArticle);
    })
    .catch(err=>{
      res.json(err);
    });
  });

  //deletes the specified article
  //(or all articles, if one isn't specified)
  //and all associated comments
  //expects an object:
  //{
  //  _id: objectId
  //}
  app.post("/api/articles/delete",(req,res)=>{
    if(!req.body._id) {
      db.Article.deleteMany()
      .then(dbArticles=>{
        dbArticles.forEach(dbArticle=>{
          dbArticle.comments.forEach(comment=>{
            db.Comment.deleteOne({_id:comment._id});
          });
        });
        return res.json(dbArticles);
      })
      .catch(err=>{
        return res.json(err);
      });
    }
    db.Article.findByIdAndDelete(req.body._id)
    .then(dbArticle=>{
      dbArticle.comments.forEach(comment=>{
        db.Comment.deleteOne({_id:comment._id});
      });
      res.json(dbArticle);
    })
    .catch(err=>{
      res.json(err);
    });
  });

  //creates a comment for the specified article
  //expects an object:
  //{
  //  _id: String
  //  comment: String  
  //} 
  app.post("/api/comments", (req,res)=>{
    db.Comment.create(req.body.comment)
    .then(dbComment=>{
      return db.Article.findByIdAndUpdate(
        req.body._id,
        {$push:{comments:dbComment._id}}
      );
    })
    .then(dbArticle=>{
      res.json(dbArticle);
    })
    .catch(err=>{
      res.json(err);
    });
  });

  //returns all articles
  //with comments populated
  app.get("/api/articles", (req,res)=>{
    db.Article.find({})
    .populate("comments")
    .then(dbArticles=>{
      res.json(dbArticles);
    })
    .catch(err=>{
      res.json(err);
    });
  });
}