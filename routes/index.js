module.exports = app => {
  require("./api-routes")(app);
  require("./html-routes")(app);
}