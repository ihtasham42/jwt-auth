const User = require("../models/User");
const Post = require("../models/Post");

const authorizeUser = async (req, res, next) => {
  const user = req.body.user;
  const postId = req.params.id;

  try {
    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(400).send("Post not found");
    }

    if (user._id == post.poster || user.isAdmin) {
      return next();
    } else {
      return res.status(400).send("You are not authorized to do this");
    }

  } catch(err) {
    return res.status(400).json(err);
  }
}

module.exports = { authorizeUser }