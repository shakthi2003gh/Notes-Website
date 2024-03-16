const { error } = require("../common/logger");

exports.error = function (err, _req, res, _next) {
  res.status(500).send("Something failed.");
  error(err);
};
