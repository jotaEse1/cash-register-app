const express = require('express')
const cors = require('cors');
const path = require('path');
require ('dotenv').config({path: path.resolve('.env')})
const app = express()
const mongoose = require('mongoose');

//connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err))

//port
const port = process.env.PORT || 8000;

//routes
const cashRegister = require('./routes/cashRegister');
//server
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/v1', cashRegister)

// ----------------------deployment------------------
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(process.cwd(), '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(), 'frontend', 'build', 'index.html'))
    })
}else{
    app.get('/', (req, res) => {
        res.send('backend is running...')
    })
}
// ----------------------deployment------------------

app.use('*', (req, res) => {
    res.status(404).send(`<h1>Page not Found</h1>`)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})
