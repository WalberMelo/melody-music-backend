const { User } = require("../models/userModel");
const {Song, validate} = require("../models/songModel")
const authMiddleware = require("../middleware/authMiddleware")


// Create Song 

async function createSong(req,res) {
    const params = validate(req.body)
    console.log('params: ', params);
    const user_token = await authMiddleware.getUser(req, res);
    console.log(user_token);
    

    try {
        if (params.error) throw{
            msg: `${params.error}`,
        }
        if (!params){
            throw { msg: "Mandatory filds must be provided in order to proceed"}
        }else{
            
            const song = await Song({...params.value, userId:user_token.id}).save()

           res.status(200).send({data: song})
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get all songs

async function getAllSongs(req, res){
    const user_token = await authMiddleware.getUser(req, res);
    try {
        const songs = await Song.find({userId:user_token.id});

        if(!songs){
            res.status(404).send({msg: "Error no songs found"})
        }else {
            res.status(200).send({ songs})
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
}

//Update Songs

async function updateSong(req, res, next) {
    const user_token = await authMiddleware.getUser(req, res)
    const song = await Song.findById(req.params.id)
    try {
        if (!song){
            res.status(404).send({
                msg:"Error: Song doesn't exist"
              })
        }else if (user_token.id !== song.userId){
            res.status(403).send({ msg: "Error: unauthorized request"})
        }else{
            song.name = req.body.name
            song.artists = req.body.artists
            song.genere = req.body.genere
           // song.thumbnail = req.body.thumbnail
           await song.save()
           res.status(201).send({ msg: "Song updated successfully"})

        }
    } catch (error) {
        res.status(500).send(error)
    }
}

// Liked song

async function likeSong(req, res, next) {
    
    const song = await Song.findById(req.params.id);
    try {
        if(!song){
            res.status(404).send({ msg: "Song not found"})
        }else{
            const user = await User.findById(req.user._id)
            const index_user = user.likedSongs.indexOf(song._id)
            const index_song = song.likedSongs.indexOf(user._id)
            if( index_user === -1 && index_song === -1){
                user.likedSongs.push(song._id)                
                song.likedBy.push(user._id)
                res.status(200).send({msg: "Added to liked songs"})
            }else{
                user.likedSongs.splice(index_song, 1);
                song.likedBy.splice(index_user, 1)
                res.status(201).send({msg: "Removed from your liked songs"})
            }
            await user.save()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    createSong,
    getAllSongs,
    updateSong,
    likeSong
}