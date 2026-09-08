// STEP-1 : IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

async function connectDB() {
  try {
    // STEP-2 : ESTABLISH CONNECTION WITH MONGODB DATABASE THROUGH MONGOOSE
    await mongoose.connect(process.env.MONGO_URI, {
      serverApi: { version: '1', strict: true, deprecationErrors: true }
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

// STEP-3 : EXPORT MODULE mongoose because we need it in other JS file
module.exports = connectDB;