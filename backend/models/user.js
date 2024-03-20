const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenght: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLenght: 3,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
  notes: {
    data: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    lastSync: {
      type: Date,
      default: Date.now,
    },
  },
  settings: {
    darkMode: {
      type: Boolean,
      default: false,
    },
    autoSync: {
      type: Boolean,
      default: true,
    },
  },
});

schema.methods.generateAuthToken = function () {
  const payload = { id: this.id };

  return jwt.sign(payload, process.env.JWT_KEY);
};

exports.User = mongoose.model("User", schema);
