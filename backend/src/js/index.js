const express = require('express')
const { addUser } = require('./db')
const app = express()
var cors = require('cors')
app.use(cors())
const port = 8000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/addUser', (req, res) => {
  console.log(req.body);
  if (!req.body.phone || !req.body.carrier) {
    throw new Error('Bad Request, must contain valid phone and provider');
  }
  addUser(req.body.phone, req.body.carrier); 
  res.send(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})