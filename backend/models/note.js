const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  autoSync: {
    type: Boolean,
    default: true,
  },
  lastSync: {
    type: Date,
    default: Date.now,
  },
});

schema.methods.isSynchronized = function (lastSync) {
  const cloudTime = new Date(this.lastSync).getTime();
  const localTime = new Date(lastSync).getTime();

  return cloudTime === localTime;
};

exports.Note = mongoose.model("Note", schema);
