const path   = require('path')
const fs     = require('fs')
const file   = path.resolve(process.argv[2])
const qdata  = path.resolve(__dirname, "quotes.json")
const name   = process.argv[3]
const input  = fs.readFileSync(file).toString()
const db     = JSON.parse(fs.readFileSync(qdata).toString())
const quotes = (name in db) ? db[name] : []

for (const text of input.split("\n\n"))
  quotes.push(text)

db[name] = quotes
fs.writeFileSync(qdata, JSON.stringify(db))
