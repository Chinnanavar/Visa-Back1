const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const visaApplicationRoutes = require('./routes/visaApplicationRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
connectDB();

// Use the routes
app.use('/api/visa', visaApplicationRoutes);

// Server listening
const port = process.env.PORT || 3033;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
