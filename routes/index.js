module.exports = (app, db) => {
  require("./api-routes")(app, db);
  require("./html-routes")(app, db);
}