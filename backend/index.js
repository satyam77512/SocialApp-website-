const express = require('express');
const app = express();
const path = require('path');
const connectToMongo = require("./Database/db");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
require("dotenv").config();

connectToMongo();

app.use(cookieParser());

app.use(express.json());
const cors = require('cors');
const { error } = require('console');

app.use(cors({
    origin: process.env.FRONTEND_API_LINK, // or your frontend URL
    credentials: true
}));

app.get('/',(req,res)=>{
    res.send("backend is running");
})

app.use("/user/auth",require("./Routes/UserCredentialsApi"));
app.use("/user/post",require("./Routes/UserPostApi"));
app.use("/user/details",require("./Routes/UserDetailsApi"));

app.post("/check", async (req, res) => {
    const token = req.cookies.token; // get your JWT token from cookies
    const {UserName} = req.body;
    if (!token) return res.status(401).json({ message: "No token" });
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(decoded.UserName ===UserName)
    return res.status(200).json({ message: "ok" });
    else
    return res.status(401).json({ message: "No token" });
});

app.listen(3000);