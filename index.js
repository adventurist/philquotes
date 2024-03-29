const express = require('express')
const res = require('express/lib/response')
const fs      = require('fs')
const path    = require('path')
const app     = express()
const PORT    = 4958
const data    = JSON.parse(fs.readFileSync(path.join(__dirname, 'quotes.json'), 'utf8'))
const aliases = JSON.parse(fs.readFileSync(path.join(__dirname, 'aliases.json'), 'utf8'))
const names   = Object.keys(data)

//---------------------------------------
function add_aliases()
{
  for (const name in aliases)
    if (name in data)
      for (const alias of aliases[name])
        data[alias] = data[name]
}
//---------------------------------------
function get_quotes(name)
{
  if (name in data)
    return data[name]
  return []
}
//---------------------------------------
function find_quotes(query, name)
{
  if (!query)
    return
  const quotes = []
  if (name && name in data)
  {
    for (const text of data[name])
      if (text.includes(query))
        quotes.push({ name, text })
  }
  else
  {
    for (const name in data)
      for (const text of data[name])
        if (text.includes(query))
          quotes.push({ name, text })
  }
  return quotes
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
      if (result = find_quotes(query, name))
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
app.listen(PORT, () =>
{
  add_aliases()
  console.log(`Server is running on http://localhost:${PORT}`)
})

