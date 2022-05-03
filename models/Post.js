const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    poster: {
      type: mongoose.Types.ObjectId,
      ref: "Users"
    },
  },
  {
    timestamps: true
  }
);

module.export = mongoose.model("Posts", PostSchema);