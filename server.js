const dotenv = require('dotenv');
const express = require('express');
const app = express();
const connectDB = require('./app/config/db');

// Body parser
app.use(express.json());

// Load env vars
dotenv.config({ path: './app/config/config.env' });

var PORT = process.env.PORT || 3000;

// mongo connect
connectDB();

const records = require('./app/routes/records');
app.use('/api/v1/records', records);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
