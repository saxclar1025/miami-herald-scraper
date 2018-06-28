const cheerio = require("cheerio");
const axios = require("axios");

module.exports = app => {
  app.get("/api/scrape", (req,res)=>{
    axios.get("https://www.miamiherald.com/news/local/")
    .then(response=>{
      const $ = cheerio.load(response.data);

      var articles = [];

      $("article").each((i, element)=>{
        articles.push({
          title: $(this).children(".title a").text(),
          summary: $(this).children("p").text(),
          url: $(this).children(".title a").attr("href")
        });
      });
    });

    res.json(articles);
  });
}