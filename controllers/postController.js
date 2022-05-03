const Post = require("../models/Post");

const paginate = (records, page) => {
  if (!page) {
    page = 1;
  }

  const skips = (page - 1) * 10;

  return records.skip(skips);
}

const getPosts = (req, res) => {
  try {
    let posts = Post.find().sort("-createdAt");
    posts = paginate(posts, req.params.page);

    res.status(200).json(posts);
  } catch(err) {
    return res.status(500).json(err);
  }
}

const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    
    const post = await Post.create({
      title,
      content,
      poster: userId
    })

    return res.status(200).json(post);

  } catch(err) {
    return res.status(500).json(err);
  }
}

const updatePost = (req, res) => {

}

const deletePost = (req, res) => {
  
}

const getPost = (req, res) => {
  
}

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPost
}