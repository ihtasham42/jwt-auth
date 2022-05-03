const router = require("express").Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../middleware/auth");
const { authorizeUser } = require("../middleware/posts");


router.route("/")
  .get(verifyToken, postController.getPosts)
  .post(verifyToken, postController.createPost);

router.route("/:id")
  .get(verifyToken, postController.getPost)
  .delete([verifyToken, authorizeUser], postController.deletePost)
  .patch([verifyToken, authorizeUser], postController.updatePost);

module.exports = router;