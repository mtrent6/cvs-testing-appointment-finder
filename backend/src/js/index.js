const express = require('express')
const { addUser } = require('./db')
const app = express()
var cors = require('cors')
app.use(cors())
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/addUser', (req, res) => {
  console.log(req.body);
  const obj = JSON.parse(req.body);
  console.log(obj);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})