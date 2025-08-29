const express = require('express');
const router = express.Router();

const {signUpHandler,loginHandler,changePassword,logoutHandle} = require("../Controllers/userCredentials");
const {mailer} = require("../Middlewares/Email");
const {routeProtector} = require("../Middlewares/protection");

router.post("/signup",signUpHandler);
router.post("/login",loginHandler);
router.post("/email",routeProtector,mailer);
router.post("/changePassword",changePassword);
router.post("/logout",routeProtector,logoutHandle);

module.exports = router;