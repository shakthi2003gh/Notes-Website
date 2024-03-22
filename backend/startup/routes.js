const bodyParser = require("body-parser");
const { user } = require("../routes/user");
const { notes } = require("../routes/notes");
const { error } = require("../middleware/error");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/api/notes", notes);
  app.use("/api/user", user);
  app.use(error);
};
