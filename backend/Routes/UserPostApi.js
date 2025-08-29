const express = require('express');
const uploadMiddleware = require('../Middlewares/multer');
const router = express.Router();

const {createPostHandler,getAllPost,likePost, deletePost} = require("../Controllers/postController");
const {routeProtector} = require("../Middlewares/protection");

router.post("/createPost",routeProtector,uploadMiddleware,createPostHandler)
router.post("/getAllPost",routeProtector,getAllPost);
router.post("/like",routeProtector,likePost)
router.post("/deletePost",routeProtector,deletePost);

module.exports = router;