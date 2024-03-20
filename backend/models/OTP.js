const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../common/generateOTP");
const { emailOTP } = require("../services/email");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLenght: 3,
    maxLength: 255,
  },
  otp: {
    type: String,
    default: "0000",
  },
  dataToken: String,
  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

schema.methods.send = async function () {
  this.otp = generateOTP();
  this.generatedAt = Date.now();

  await emailOTP(this.email, this.otp);
  await this.save();
};

schema.methods.verify = async function (otp) {
  const isExpired = await this.checkExpired();
  if (isExpired) return { isExpired };

  const isVerified = this.otp === otp;
  if (!isVerified) return { verifiedUser: isVerified };

  const user = jwt.verify(this.dataToken, process.env.JWT_KEY);
  await this.deleteOne({ _id: this._id });

  return { verifiedUser: user };
};

schema.methods.checkExpired = async function (expireAfterMinutes = 15) {
  const generatedAt = this.generatedAt.getTime();
  const now = Date.now();
  const difference = Math.floor(Math.abs(generatedAt - now) / 60000);

  const isExpired = difference > expireAfterMinutes;
  if (!isExpired) return false;

  await this.deleteOne({ _id: this._id });
  return true;
};

exports.OTP = mongoose.model("OTP", schema);
