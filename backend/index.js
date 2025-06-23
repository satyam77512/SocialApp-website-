const express = require('express');
const app = express();
const path = require('path');
const connectToMongo = require("./Database/db");
connectToMongo();

app.use(express.json());
const cors = require('cors');
app.use(cors());


app.get('/',(req,res)=>{
    res.send("backend is running");
})

app.use("/user/auth",require("./Routes/UserCredentialsApi"));
app.use("/user/post",require("./Routes/UserPostApi"));
app.use("/user/details",require("./Routes/UserDetailsApi"));


app.listen(3000);