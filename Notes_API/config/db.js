const mongoose = require ('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect ('mongodb://127.0.0.1:27017/notesDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log (`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error ('Error connecting to MongoDB:', err);
    process.exit (1);
  }
};

module.exports = connectDB;
