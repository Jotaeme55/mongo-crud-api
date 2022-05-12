
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const song = require('../models/song');

//get all songs
router.get('/', async (req, res) => {
    try {
        const songDB = await song.find();
        res.status(200).json(songDB);
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'An error has occurred',
            error
        })
    }
})

//get all songs and order by year released
router.get('/orderByAddedDescendant', async (req, res) => {
    try {
        const songDB = await song.find().sort({ added:-1});
        res.status(200).json(songDB);
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'An error has occurred',
            error
        })
    }
})

//get all songs and order by top year
router.get('/orderByYearReleasedAscendant', async (req, res) => {
    try {
        const songDB = await song.find().sort({year_released:1});
        res.status(200).json(songDB);
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'An error has occurred',
            error
        })
    }
})

//Get Song by Id
router.get('/:songId', async (req, res) => {
    const _Id = req.params.songId;
    try {
        const songDB = await song.findOne({ "_id": mongoose.Types.ObjectId(_Id) });
        res.status(200).json(songDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});

//delete song by id
router.delete('/:songId', async (req, res) => {
    const _Id = req.params.songId;
    try {
        const songDB = await song.findOneAndRemove({ "_id": mongoose.Types.ObjectId(_Id) });
        res.status(200).json(songDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'An error has occurred',
            error
        })
    }
})

//crete a song
router.post("/", async (req, res) => {
    const body = req.body
    body._id = new mongoose.Types.ObjectId()
    try {
        var songDB = await song.create(body)
        res.status(200).json(songDB)
    } catch (error) {
        return res.status(500).json({
            mensaje: "error in posting song",
            error: error
        })
    }
})

//update a song
router.put("/:songId",async (req, res) => {
    const body = req.body
    var _id = req.params.songId
    try {
        var songDB = await song.findByIdAndUpdate(_id,body)
        res.status(200).json(songDB)
    } catch (error) {
        return res.status(500).json({
            mensaje: "error in posting song",
            error: error
        })
    }
})
//get songs by title
router.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const songDB = await song.find({ "title": title});
        res.status(200).json(songDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'An error has occurred',
            error
        })
    }
})

//get songs by artist
router.get('/artist/:artist', async (req, res) => {
    const artist = req.params.artist;
    try {
        const songDB = await song.find({ "artist": artist});
        res.status(200).json(songDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'An error has occurred',
            error
        })
    }
})





module.exports = router;