const cheerio = require("cheerio");
const axios = require("axios");

module.exports = app => {
  app.get("/api/scrape", (req,res)=>{
    axios.get("https://www.miamiherald.com/news/local/")
    .then(response=>{
      const $ = cheerio.load(response.data);

      var articles = [];

      $("article").each((i, element)=>{
        console.log($(this).find(".title a").text());
        console.log($(this).find("p").text());
        console.log($(this).find(".title a").attr("href"));
        articles.push({
          title: $(this).find(".title a").text(),
          summary: $(this).find("p").text(),
          url: $(this).find(".title a").attr("href")
        });
      });

      res.json(articles);
    });
  });
}