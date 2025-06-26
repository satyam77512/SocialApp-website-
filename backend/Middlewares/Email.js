const nodemailer = require("nodemailer");
const userModel = require("../Models/user");
const jwt = require('jsonwebtoken');

require("dotenv").config();

const mailer = async(req,res) =>{
    const {UserName} = req.body;
    const user = await userModel.findOne({UserName});

    var time = Date.now();
    time = time + (10*60*1000);

    const to = user.Email;

    var token = jwt.sign({UserName}, process.env.JWT_SECRET);
    const text = `${process.env.FRONTEND_API_LINK}/changePassword/${token}/${time}`;

    try {
        // Configure Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        // Email options
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: "Change Password",
            text: text,
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "Email sent successfully!", info });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Failed to send email" });
    }
}

module.exports = {mailer};