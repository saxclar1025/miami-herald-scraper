const cheerio = require("cheerio");
const axios = require("axios");

module.exports = (app,db) => {
  app.get("/api/scrape", function (req,res){
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

      res.json(articles);
    });
  });
}