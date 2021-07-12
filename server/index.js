const express = require('express')
const cors = require('cors')
const path =  require('path')
const mongo = require('./mongo.js')

const app = express()
const port = 3000
const db = "gear19"
const collection = "states"

var whitelist = [
    'https://data.ccmb.res.in','http://192.168.14.167:8080',
    'http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082',
    undefined
]
var corsOptions = {
    origin: function (origin, callback) {
      console.log('Requesting URL: ', origin)
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    mongo.main().then(val => {
        res.send(val)
    })
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.listen(port, () => {
    console.log(
        `%cExample app listening at http://localhost:${port}`,
        "color: white; background: green;")
})