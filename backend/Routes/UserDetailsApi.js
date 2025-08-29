const express = require('express');
const uploadMiddleware = require('../Middlewares/multer');
const router = express.Router();

const {UserDetail,Update,userPost,Search} = require("../Controllers/detailsController");
const {routeProtector} = require("../Middlewares/protection");

router.post("/UserDetails",routeProtector,UserDetail);
router.post("/update",routeProtector,uploadMiddleware,Update);
router.post("/userPost",routeProtector,userPost);
router.post("/search",routeProtector,Search);

module.exports = router;