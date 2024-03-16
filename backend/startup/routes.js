const bodyParser = require("body-parser");
const { error } = require("../middleware/error");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(error);
};
