const Album = require('../models/Album')
const mongoose = require('mongoose')

//get all albums
const getAllAlbums = async (req, res) => {
    const albums = await Album.find({})
    res.status(200).json(albums)
}

//get a single album
const getSingleAlbum = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'Album not found' })

    const singleAlbum = await Album.findById(id)
    if (!singleAlbum) {
        return res.status(404).json({ error: 'Album not found' })
    }
    res.status(200).json(singleAlbum)

}

//add a new album
const addAlbum = async (req, res) => {
    const { name, artist, genre, year, cover_URL } = req.body

    let emptyFields = []

    if(!name) emptyFields.push('name')
    if(!artist) emptyFields.push('artist')
    if(!genre) emptyFields.push('genre')
    if(!year) emptyFields.push('year')

    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in highlighted fields ', emptyFields})

    try {
        const newAlbum = await Album.create({ name, artist, genre, year, cover_URL })
        res.status(200).json(newAlbum)
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}

//delete an album
const deleteAlbum = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'Album not found' })

    const singleAlbum = await Album.findOneAndDelete({ _id: id })
    if (!singleAlbum) {
        return res.status(404).json({ error: 'Album not found' })
    }
    res.status(200).json(singleAlbum)

}

//update an album

const updateAlbum = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'Album not found' })

    let emptyFields = []

    if(!req.body.name) emptyFields.push('name')
    if(!req.body.artist) emptyFields.push('artist')
    if(!req.body.genre) emptyFields.push('genre')
    if(!req.body.year) emptyFields.push('year')

    if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in highlighted fields ', emptyFields})

    const oldAlbum = await Album.findOneAndUpdate(
        { _id: id }, { ...req.body }, {new: true}
    )
    if (!oldAlbum) {
        return res.status(404).json({ error: 'Album not found' })
    }
    res.status(200).json({oldAlbum})

}

module.exports = {
    getAllAlbums,
    getSingleAlbum,
    addAlbum,
    deleteAlbum,
    updateAlbum
}