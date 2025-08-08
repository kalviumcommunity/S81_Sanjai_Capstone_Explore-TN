const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// ✅ CORS config – allow only your frontend
app.use(cors({
  origin: 'https://explore-tnoffcial.netlify.app/', // Netlify frontend
  credentials: true, // needed if using cookies/auth
}));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Static folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/user-picks', express.static(path.join(__dirname, 'user-picks')));

// ✅ Routes
const userRoute = require('./Controllers/userroute');
const guideRoute = require('./Controllers/guideroute');
const userPicksRoute = require('./Controllers/userPicks');

app.use('/User', userRoute);
app.use('/Guide', guideRoute);
app.use('/api/user-picks', userPicksRoute);

app.get('/', (req, res) => {
  res.send('Explore-TN Backend is running 🚀');
});

// ✅ Export the app
module.exports = { app };
