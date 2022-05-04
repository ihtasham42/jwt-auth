const router = require("express").Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../middleware/auth");


router.route("/")
  .get(verifyToken, postController.getPosts)
  .post(verifyToken, postController.createPost);

router.route("/:id")
  .get(verifyToken, postController.getPost)
  .delete(verifyToken, postController.deletePost)
  .patch(verifyToken, postController.updatePost);

module.exports = router;