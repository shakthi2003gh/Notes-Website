const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Response = require("../common/response");
const { User } = require("../models/user");
const { OTP } = require("../models/OTP");
const Validate = require("../validators/user");

module.exports = class {
  static auth(req, res) {
    if (!req.user) return Response.noAuthToken(res);

    res.json(req.user);
  }

  static async login(req, res) {
    const { error, value } = Validate.login(req.body);
    if (error) return Response.badPayload(res, error.details[0].message);

    const isExist = await User.findOne({ email: value.email });
    if (!isExist) return Response.inValidCredential(res);

    const isVerified = await bcrypt.compare(value.password, isExist.password);
    if (!isVerified) return Response.inValidCredential(res);

    const user = await User.findById(isExist._id).select("-password -notes");
    const token = user.generateAuthToken();
    res.setHeader("Authorization", token).json(user);
  }

  static async register(req, res) {
    const { error, value } = Validate.register(req.body);
    if (error) return Response.badPayload(res, error.details[0].message);

    const isEmailAlreadyExist = await User.findOne({ email: value.email });
    if (isEmailAlreadyExist) return Response.emailAlreadyExist(res);

    const isAlreadyRegisterOTP = await OTP.findOne({ email: value.email });
    if (isAlreadyRegisterOTP) {
      await isAlreadyRegisterOTP.send();
      return Response.otpSend(res);
    }

    const otp = new OTP({
      email: value.email,
      dataToken: jwt.sign(value, process.env.JWT_KEY),
    });

    await otp.send();
    Response.otpSend(res);
  }

  static async verify(req, res) {
    const { error, value } = Validate.verify(req.body);
    if (error) return Response.badPayload(res, error.details[0].message);

    const isUserAlreadyExist = await User.findOne({ email: value.email });
    if (isUserAlreadyExist) return Response.userAlreadyVerified(res);

    const register = await OTP.findOne({ email: value.email });
    if (!register) return Response.userNotRegister(res);

    const { isExpired, verifiedUser } = await register.verify(value.otp);
    if (isExpired) return Response.otpExpired(res);
    if (!verifiedUser) return Response.inValidOTP(res);

    const user = new User(verifiedUser);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(verifiedUser.password, salt);

    await user.save();

    const select = "-password -notes";
    const userResponse = await User.findById(user._id).select(select);
    const token = userResponse.generateAuthToken();
    res.status(201).setHeader("Authorization", token).json(userResponse);
  }

  static async resendOTP(req, res) {
    const { error, value } = Validate.resend(req.body);
    if (error) return Response.badPayload(res, error.details[0].message);

    const registerOTP = await OTP.findOne({ email: value.email });
    if (!registerOTP) return Response.userNotRegister(res);

    await registerOTP.send();
    Response.otpResend(res);
  }

  static async delete(req, res) {
    await User.deleteOne({ _id: req.user.id });
    res.status(204).end();
  }

  static async syncSettings(req, res) {
    const { error, value } = Validate.settings(req.body);
    if (error) return Response.badPayload(res, error.details[0].message);

    const newLastSync = await req.user.syncSettings(value);
    res.json({ lastSync: newLastSync });
  }

  static async checkSettingsSync(req, res) {
    res.json(req.user?.settings);
  }
};
