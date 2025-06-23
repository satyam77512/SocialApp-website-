const express = require('express');
const uploadMiddleware = require('../Middlewares/multer');
const router = express.Router();

const {createPostHandler,getAllPost,likePost, deletePost} = require("../Controllers/postController");

router.post("/createPost",uploadMiddleware,createPostHandler)
router.post("/getAllPost",getAllPost);
router.post("/like",likePost)
router.post("/deletePost",deletePost);

module.exports = router;