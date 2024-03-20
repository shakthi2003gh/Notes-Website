const { error } = require("../common/logger");
const Response = require("../common/response");

exports.error = function (err, _req, res, _next) {
  Response.somthingWentWrong(res);
  error(err);
};
