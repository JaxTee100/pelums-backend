const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectToDB = () => {
  // Mongo URI from environment variable (ensure you've set MONGO_URI in your .env file)
  const mongoURI = process.env.MONGO_URI;

  // Ensure that the URI is provided
  if (!mongoURI) {
    console.error('❌ MongoDB URI not provided');
    process.exit(1);
  }

  // Connect to MongoDB using Mongoose
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('✅ MongoDB Connected');
    })
    .catch((err) => {
      console.error('❌ DB Connection Error:', err);
      process.exit(1); // Exit the process if DB connection fails
    });
};

// Export the function so it can be called in the main app
module.exports = connectToDB;
