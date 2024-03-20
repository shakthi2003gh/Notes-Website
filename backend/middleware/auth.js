const jwt = require("jsonwebtoken");
const Response = require("../common/response");
const { User } = require("../models/user");
const { error } = require("../common/logger");

exports.auth = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return Response.noAuthToken(res);

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(id).select("-password");
    if (!user) return Response.invalidAuthToken(res);

    req.user = user;
    next();
  } catch (ex) {
    Response.invalidAuthToken(res);
    error(ex);
  }
};
