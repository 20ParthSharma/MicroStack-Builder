const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB().then(async () => {
  // Sync models
  require('./models/Project');
  await sequelize.sync();
  console.log('SQLite models synced');
});

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/project'));
app.use('/api/generate', require('./routes/generate'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));
