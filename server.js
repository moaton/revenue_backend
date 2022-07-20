const express = require('express')
const fs = require('fs')
const https = require('https')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
var corsOptions = {
  // origin: 'http://localhost:8081'
  origin: '*'
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models")
db.sequelize.sync()

// const getAll = require('./app/controllers/product.controller.js')

app.get('/', (req, res) => {
  // console.log(getAll.findAll());
  res.json({message: 'Hello'})
})
require("./app/routes/accounts.routes")(app);
require("./app/routes/revenues.routes")(app);
const PORT = process.env.PORT || 8080
// 8080

const httpsOptions = {
  key: fs.readFileSync('certificates/key.pem'),
  cert: fs.readFileSync('certificates/cert.pem')
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

// https.createServer(httpsOptions, app).listen(PORT, () => {
//   console.log('HTTPS');
// })