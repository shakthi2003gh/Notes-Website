const { OTPResponse } = require("./otp");

exports.userResponse = class extends OTPResponse {
  static noAuthToken(res) {
    const status = 400;
    const response = { status, message: "Access denied. No token provided." };

    res.status(status).json(response);
  }

  static invalidAuthToken(res) {
    const status = 401;
    const response = { status, message: "Invalid Auth Token" };

    res.status(status).json(response);
  }

  static inValidCredential(res) {
    const status = 401;
    const response = { status, message: "Invalid email or password" };

    res.status(status).json(response);
  }

  static userNotRegister(res) {
    const status = 404;
    const response = { status, message: "User not register" };

    res.status(status).json(response);
  }

  static userAlreadyVerified(res) {
    const status = 409;
    const response = { status, message: "User already verified" };

    res.status(status).json(response);
  }

  static userAlreadyExist(res) {
    const status = 409;
    const response = { status, message: "User already exist" };

    res.status(status).json(response);
  }

  static emailAlreadyExist(res) {
    const status = 409;
    const response = { status, message: "User with email already exist" };

    res.status(status).json(response);
  }

  static emailAlreadyRegister(res) {
    const status = 409;
    const response = { status, message: "User with email already register" };

    res.status(status).json(response);
  }
};
