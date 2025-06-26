const express = require('express');
const router = express.Router();

const {signUpHandler,loginHandler,changePassword,logoutHandle} = require("../Controllers/userCredentials");
const {mailer} = require("../Middlewares/Email");

router.post("/signup",signUpHandler);
router.post("/login",loginHandler);
router.post("/email",mailer);
router.post("/changePassword",changePassword);
router.post("/logout",logoutHandle);

module.exports = router;