const mongoose = require("mongoose");

const postScheme = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);

const postModel = mongoose.model("postmodel", postScheme);

module.exports = postModel;
