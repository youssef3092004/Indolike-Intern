const express = require ('express');
const connectDB = require ('./config/db');
const noteRoute = require ('./routes/noteRoute');

const app = express ();

const PORT = process.env.PORT || 3000;

connectDB ();

app.use (express.json ());

app.use ('/api', noteRoute);

app.listen (PORT, () => {
  console.log (`Notes API running at http://localhost:${PORT}`);
});
