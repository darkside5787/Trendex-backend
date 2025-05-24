const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Lead = require('./models/Lead');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Debugging step to verify environment variable
console.log("Database URL:", process.env.DATABASE_URL);
if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL not found in .env file");
  process.exit(1);
}

// MongoDB connection with improved error handling
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection failed:', err);
  process.exit(1);
});

// Routes
app.post('/submit', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(200).json({ message: 'Saved to MongoDB' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save lead' });
  }
});

app.get('/', (req, res) => res.send('Trendex Backend is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
console.log("Database URL:", process.env.DATABASE_URL); // Debugging step
if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL not found in .env file");
  process.exit(1);
}

