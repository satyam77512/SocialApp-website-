const userModel = require("../Models/user");
const postModel = require("../Models/post");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const signUpHandler = async (req, res) => {
    try {
        const { Name, Email, UserName, Password } = req.body;
        // check
        const user = await userModel.findOne({ UserName });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error generating salt" });
            }
            bcrypt.hash(Password, salt, async (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error hashing password" });
                }
                try {
                    const newUser = await userModel.create({
                        UserName,
                        Name,
                        Email,
                        Password: hash
                    });
                    const token = jwt.sign({ UserName: UserName }, process.env.JWT_SECRET,
                        { expiresIn: "7d" }
                    );
                    res.cookie("token", token, {
                        httpOnly: true,
                        sameSite: "strict",
                        secure: true, // true if NOT localhost, false if localhost
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    });
                    const data = newUser;
                    res.status(200);
                    return res.json(data);
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Error creating user" });
                }
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}
const loginHandler = async (req, res) => {
    try {
        const { UserName, Password } = req.body;
        const user = await userModel.findOne({ UserName });

        if (!user) {
            console.log("user not exist");
            return res
                .status(409)
                .json({ success: false, message: "User not exist" });
        } else {
            bcrypt.compare(Password, user.Password, async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ success: false, message: "Error comparing password" });
                }
                if (result) {
                    try {
                        const token = jwt.sign(
                            { UserName: user.UserName },
                            process.env.JWT_SECRET,
                            { expiresIn: "7d" }
                        );
                        res.cookie("token", token, {
                            httpOnly: true,
                            sameSite: "strict",
                            secure: true, // true if NOT localhost, false if localhost
                            maxAge: 7 * 24 * 60 * 60 * 1000
                        });
                        const data = user;
                        return res.json(data);
                    } catch (error) {
                        console.log(error);
                        return res.status(500).json({ success: false, message: "Error generating token" });
                    }
                } else {
                    return res
                        .status(409)
                        .json({ success: false, message: "Wrong Password" });
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

const changePassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).json({ success: false, message: "Invalid or expired token" });
            }
            const { UserName } = decoded;
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).json({ success: false, message: "Error generating salt" });
                }
                bcrypt.hash(newPassword, salt, async (err, hash) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: "Error hashing password" });
                    }
                    try {
                        const user = await userModel.findOne({ UserName });
                        if (!user) {
                            return res.status(404).json({ success: false, message: "User not found" });
                        }
                        user.Password = hash;
                        await user.save();
                        return res.json({ success: true });
                    } catch (error) {
                        return res.status(500).json({ success: false, message: "Database error" });
                    }
                });
            });
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
const logoutHandle = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict", // or "strict", must match your login cookie
        secure: true,     // must match your login cookie
    });
    res.json({ message: "Logged out" });
}

module.exports = { signUpHandler, loginHandler, changePassword, logoutHandle };