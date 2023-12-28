const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4958;

const filePath = path.join(__dirname, 'quotes.json');
const quotesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//-------------------------------------------------
app.get('/', (req, res) =>
{
  const name = req.query.name.toLowerCase();

  if (!name)
    return res.status(400).json({ error: 'Name parameter is required.' });

  if (!quotesData[name])
    return res.status(404).send("Fuck you asshole. - Arnold");

  const quotes = quotesData[name];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  res.send(randomQuote)
})
//-------------------------------------------------
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`)})
