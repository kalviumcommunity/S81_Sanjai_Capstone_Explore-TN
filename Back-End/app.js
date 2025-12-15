const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors({
  origin: [
    'https://explore-tnoffcial.netlify.app',
    'http://localhost:5173'
  ],
  credentials: true,
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/user-picks', express.static(path.join(__dirname, 'user-picks')));

const userRoute = require('./Controllers/userroute');
const guideRoute = require('./Controllers/guideroute');
const userPicksRoute = require('./Controllers/userPicks');

app.use('/User', userRoute);
app.use('/Guide', guideRoute);
app.use('/api/user-picks', userPicksRoute);

app.get('/', (req, res) => {
  res.send('Explore-TN Backend is running buddy 🚀');
});

module.exports = { app };
