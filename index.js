const express = require('express')
const fs      = require('fs')
const path    = require('path')
const app     = express()
const PORT    = 4958
const file    = path.join(__dirname, 'quotes.json');
const data    = JSON.parse(fs.readFileSync(file, 'utf8'));
const names   = [ 'hegel', 'marx', 'random', 'lenin', 'mao', 'trans', 'marcuse' ]
//-------------------------------------------------
app.get('/', (req, res) =>
{
  const name = (req.query.name) ? req.query.name.toLowerCase() : names[Math.floor(Math.random() * names.length)]

  if (!name)
    return res.status(400).json({ error: 'Name parameter is required.' });

  if (!data[name])
    return res.status(404).send("Fuck you asshole. - Arnold");

  const quotes = data[name];
  const text   = quotes[Math.floor(Math.random() * quotes.length)];

  res.json({name, text})
})
//-------------------------------------------------
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`)})
