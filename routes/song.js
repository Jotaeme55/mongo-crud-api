
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const song = require('../models/song');
const fs= require("fs")

//get all songs
router.get('',async(req, res) => {
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

//Get Song by Id
router.get('/:songId', async(req, res) => {
    const _Id = req.params.songId;
        try {
            const songDB = await song.findOne({"_id": mongoose.Types.ObjectId(_Id)});
            res.status(200).json(songDB);
        } catch (error) {
            return res.status(400).json({
            mensaje: 'An error has occurred',
            error
            })
        }
    });
//delete song by id
router.delete('/:songId',async(req, res) => {
    const _Id = req.params.songId;
        try {
            const songDB = await song.findOneAndRemove({"_id": mongoose.Types.ObjectId(_Id)});
            res.status(200).json(songDB);
        } catch (error) {
            return res.status(400).json({
            mensaje: 'An error has occurred',
            error
            })
        }
    })

    module.exports = router;