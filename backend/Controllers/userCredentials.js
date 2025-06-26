const userModel = require("../Models/user");
const postModel = require("../Models/post");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const signUpHandler = async (req, res) => {
    const { Name, Email, UserName, Password } = req.body;
    // check
    const user = await userModel.findOne({ UserName });
    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(Password, salt, async (err, hash) => {
                const newUser = await userModel.create({
                    UserName,
                    Name,
                    Email,
                    Password: hash
                });
                 const token = jwt.sign({ UserName:UserName }, process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                )

                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: false, // true if NOT localhost, false if localhost
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                const data = newUser;
                res.status(200);
                return res.json(data);
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(505);
    }
}
const loginHandler = async (req, res) => {
    const { UserName, Password } = req.body;
    const user = await userModel.findOne({ UserName });

    if (!user) {
        console.log("user not exist");
        return res
            .status(409)
            .json({ success: false, message: "User not exist" });
    }
    else {
        bcrypt.compare(Password, user.Password, async function (err, result) {
            if (result) {
                const token = jwt.sign({ UserName: user.UserName }, process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                )

                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: false, // true if NOT localhost, false if localhost
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                const data = user;
                return res.json(data);
            }
            else {
                return res
                    .status(409)
                    .json({ success: false, message: "Wrong Password" });
            }
        });
    }

}

const changePassword = async (req, res) => {
    const { token, newPassword } = req.body;
    jwt.verify(token,process.env.JWT_SECRET , function (err, decoded) {
        const { UserName } = decoded;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, async (err, hash) => {
                try {
                    const user = await userModel.findOne({ UserName });
                    user.Password = hash;
                    await user.save();
                    return res.json({ sucess: true });
                } catch (error) {
                    return res.json({ sucess: false });
                }
            })
        })
    });

}
const logoutHandle = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict", // or "strict", must match your login cookie
        secure: false,     // must match your login cookie
    });
    res.json({ message: "Logged out" });
}

module.exports = { signUpHandler, loginHandler, changePassword, logoutHandle };