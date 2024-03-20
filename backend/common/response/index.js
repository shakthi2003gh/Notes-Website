const { userResponse } = require("./user");

module.exports = class extends userResponse {
  static badPayload(res, message) {
    const status = 400;
    const response = { status, message };

    res.status(status).json(response);
  }

  static somthingWentWrong(res) {
    const status = 500;
    const response = { status, message: "Something went wrong on server" };

    res.status(status).send(response);
  }
};
