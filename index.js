// const cors = require('cors');
const express = require('express');
const port = 5000

const app = express();
app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})