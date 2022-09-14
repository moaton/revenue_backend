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


app.get('/', (req, res) => {
  res.json({message: 'Hello'})
})
require("./app/routes/accounts.routes")(app);
require("./app/routes/revenues.routes")(app);
const PORT = process.env.PORT || 8080
// 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
