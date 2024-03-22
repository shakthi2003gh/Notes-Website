const { userResponse } = require("./user");

module.exports = class extends userResponse {
  static badPayload(res, message) {
    const status = 400;
    const response = { status, message };

    res.status(status).json(response);
  }

  static inValidObjectId(res) {
    const status = 400;
    const response = { status, message: "Invalid ID" };

    res.status(status).json(response);
  }

  static IDNotFound(res) {
    const status = 404;
    const response = { status, message: "ID not found" };

    res.status(status).json(response);
  }

  static somthingWentWrong(res) {
    const status = 500;
    const response = { status, message: "Something went wrong on server" };

    res.status(status).json(response);
  }
};
