const express = require('express');
const cors = require('cors');
const path = require('path');
require ('dotenv').config({path: path.resolve('.env')})
const app = express()

//port
const port = process.env.PORT || 8000;

//routes
const cashRegister = require('./routes/cashRegister');
//server
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/v1', cashRegister)
app.use('*', (req, res) => {
    res.status(404).send(`<h1>Page not Found</h1>`)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})
