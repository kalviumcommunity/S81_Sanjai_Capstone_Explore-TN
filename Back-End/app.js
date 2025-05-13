const express=require('express')
const app=express()
const path=require('path')
const cors = require("cors");
app.use(express.json())
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoute = require("./Controllers/userroute");
const guideRoute = require("./Controllers/guideroute");

app.use('/User', userRoute);
app.use('/Guide', guideRoute);

module.exports = { app };