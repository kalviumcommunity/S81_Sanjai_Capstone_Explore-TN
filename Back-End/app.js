const express=require('express')
const app=express()
const path=require('path')
const cors = require("cors");
app.use(express.json())
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "user-picks")));
const userRoute = require("./Controllers/userroute");
const guideRoute = require("./Controllers/guideroute");
const userPicksRoute = require("./Controllers/userPicks");

app.use('/User', userRoute);
app.use('/Guide', guideRoute);
app.use('/api/user-picks', userPicksRoute);

module.exports = { app };