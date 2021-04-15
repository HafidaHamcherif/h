const mongoose = require('mongoose');

const schema = {
    title: String,
    auteur:String,
    imageUrl:String
};

const Schema = new mongoose.Schema(schema);
const ArtModel = mongoose.model("Art",Schema);

module.exports = ArtModel;