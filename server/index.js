
const express = require('express');
const dotenv  = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8080;
const routes = require('./routes/routes');

const app = express();
const cors = require('cors');
var whitelist = [
    'https://data.ccmb.res.in',
    'http://192.168.14.180:8080','http://192.168.14.180:8081','http://192.168.14.180:8082',
    'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002',
    'http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082',
    undefined
];

var corsOptions = {
origin: function (origin, callback) {
    console.log('Requesting URL: ', origin)
    if (whitelist.indexOf(origin) !== -1) callback(null, true)
    else callback(new Error('Not allowed by CORS'))
}
}

app.use(cors(corsOptions))
app.use(express.json());
app.use('/', routes)
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})