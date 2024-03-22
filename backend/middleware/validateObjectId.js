const mongoose = require("mongoose");
const Response = require("../common/response");

exports.validateObjectId = function (req, res, next) {
  const id = req.params.id;
  if (!id) return Response.IDNotFound(res);

  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) return Response.inValidObjectId(res);

  next();
};
