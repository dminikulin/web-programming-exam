const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const albumsRoute = require('./routes/albums')

require('dotenv').config()

app.use(express.json())
app.use('/api/albums', albumsRoute)

const PORT = process.env.PORT

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to DB\nListening on port ${PORT}`)
        })
    })
    .catch((e) => console.log(e))