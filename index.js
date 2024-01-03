const express = require('express')
const res = require('express/lib/response')
const fs      = require('fs')
const path    = require('path')
const app     = express()
const PORT    = 4958
const file    = path.join(__dirname, 'quotes.json');
const data    = JSON.parse(fs.readFileSync(file, 'utf8'))
const names   = Object.keys(data)

function get_quotes(name)
{
  if (name in data)
    return data[name]
  return []
}

function find_quote(query, name)
{
  if (!query)
    return

  if (name && name in data)
  {
    for (const text of data[name])
      if (text.includes(query))
        return { name, text }
  }
  else
  {
    for (const name in data)
      for (const text of data[name])
        if (text.includes(query))
          return { name, text }
  }
}

//-------------------------------------------------
app.get('/:name?', (req, res) =>
{
  try
  {
    let   name  = (req.params.name) ? req.params.name.toLowerCase()       : ''
    const query = (req.query.query) ? decodeURIComponent(req.query.query) : ''
    if (query)
    {
      let result
      if (result = find_quote(query, name))
        return res.json(result)
      else
        return res.status(404).json({ error: `No result found for "${query}"`})
    }

    if (!name)
      name = names[Math.floor(Math.random() * names.length)]
    else
    if (!data[name])
      return res.status(404).json({ error: `${name} not found` })

    const quotes = data[name];
    const text   = quotes[Math.floor(Math.random() * quotes.length)];

    res.json({name, text})
  }
  catch (e)
  {
    console.error('Error handling request', e)
    res.status(400).json({ error: 'Complete failure' })
  }
})
//-------------------------------------------------
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`)})
