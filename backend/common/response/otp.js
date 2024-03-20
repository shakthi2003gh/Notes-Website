exports.OTPResponse = class {
  static otpSend(res) {
    const status = 201;
    const response = { status, message: "OTP send successfully" };

    res.status(status).json(response);
  }

  static otpResend(res) {
    const status = 200;
    const response = { status, message: "Resend OTP send successfully" };

    res.status(status).json(response);
  }

  static inValidOTP(res) {
    const status = 400;
    const response = { status, message: "Invalid OTP" };

    res.status(status).json(response);
  }

  static otpExpired(res) {
    const status = 400;
    const message = "OTP has expired. Please register again";

    res.status(status).json({ status, message });
  }
};
