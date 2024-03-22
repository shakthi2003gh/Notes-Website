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
      ref: "Note",
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

schema.methods.removeNote = async function (id) {
  const noteId = id.toString();

  this.notes.data = this.notes.data.filter((_id) => _id.toString() !== noteId);
  this.notes.lastSync = Date.now();
  await this.save();

  return this.notes.lastSync;
};

exports.User = mongoose.model("User", schema);
