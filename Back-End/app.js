const express=require('express')
const app=express()
app.use(express.json())

const userRoute = require("./Controllers/userroute");
const guideRoute = require("./Controllers/guideroute");

app.use('/User', userRoute);
app.use('/Guide', guideRoute);

module.exports = { app };