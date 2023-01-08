const express = require('express')
const router = express.Router()
const {getAllAlbums, getSingleAlbum, addAlbum, deleteAlbum, updateAlbum} = require('../controllers/albumController')
const Album = require('../models/Album')

router.get('/', getAllAlbums)

router.get('/:id', getSingleAlbum)

router.post('/', addAlbum)

router.delete('/:id', deleteAlbum)

router.patch('/:id', updateAlbum)

module.exports = router