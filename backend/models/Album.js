const mongoose = require('mongoose')

const AlbumSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    cover_URL: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Albums', AlbumSchema)