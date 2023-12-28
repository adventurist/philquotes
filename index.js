const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4958; // You can use any port you prefer

// Read the JSON file
const filePath = path.join(__dirname, 'quotes.json');
const quotesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Define a route to handle GET requests
app.get('/', (req, res) => {
  const name = req.query.name;

  // Check if the name parameter is provided
  if (!name) {
    return res.status(400).json({ error: 'Name parameter is required.' });
  }

  // Check if the provided name exists in the quotes data
  if (!quotesData[name]) {
    return res.status(404).send("Fuck you asshole. - Arnold");
  }

  // Get a random quote for the specified name
  const quotes = quotesData[name];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  res.send(randomQuote)
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

