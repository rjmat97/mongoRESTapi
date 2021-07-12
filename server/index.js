const express = require('express')
const path =  require('path')
const mongo = require('./mongo.js')

const app = express()
const port = 3000
const db = "gear19"
const collection = "states"


app.get('/', (req, res) => {
    mongo.main().then(val => {
        res.send(val)
    })
    
    // main().then(val => res.send(val))
    // console.log(val)
    // res.send(val)
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.listen(port, () => {
    console.log(
        `%cExample app listening at http://localhost:${port}`,
        "color: white; background: green;")
})