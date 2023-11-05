
const express = require('express')
const app = express()
const port = 5001
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`The blogopolish server running ${port}`)
})