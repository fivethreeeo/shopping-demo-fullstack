const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoURI = process.env.LOCAL_DB_ADDRESS
const port = process.env.PORT || 5000

mongoose
  .connect(mongoURI)
  .then(() => console.log('mongoose connected'))
  .catch(error => console.log('DB conection fail: ', error))

app.listen(port, () => console.log(`server on port ${port}`))
