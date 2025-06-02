const express = require('express');
const { connectToDatabase, getDb } = require('./db');
const app = express();
const port = 3000;

// Connect to database when starting the app
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`MovieApp running on http://localhost:${port}`);
  });
});

// Example route
app.get('/movies', async (req, res) => {
  try {
    const db = getDb();
    const movies = await db.collection('movies').find().toArray();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
