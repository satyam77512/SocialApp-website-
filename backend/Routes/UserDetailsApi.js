const express = require('express');
const uploadMiddleware = require('../Middlewares/multer');
const router = express.Router();

const {UserDetail,Update,userPost,Search} = require("../Controllers/detailsController");

router.post("/UserDetails",UserDetail);
router.post("/update",uploadMiddleware,Update);
router.post("/userPost",userPost);
router.post("/search",Search);

module.exports = router;