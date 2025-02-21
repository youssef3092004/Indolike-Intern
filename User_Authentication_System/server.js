require ('dotenv').config ();
const express = require ('express');
const connectDB = require ('./config/db');
const cors = require ('cors');

const authRoutes = require ('./routes/authRoute');
const {verifyToken} = require ('./controllers/authController');

const app = express ();
app.use (express.json ());
app.use (cors ());

connectDB ();

app.use ('/auth', authRoutes);

// Protected Page
app.get ('/dashboard', verifyToken, (req, res) => {
  res.json ({message: 'Welcome to the protected dashboard!', user: req.user});
});

const PORT = process.env.PORT || 5000;
app.listen (PORT, () => console.log (`Server running on port ${PORT}`));
