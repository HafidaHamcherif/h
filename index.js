const express = require('express');
const mongoose = require ('mongoose');


const {PORT, MONGODB_URI} = process.env

const port = PORT || 8000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const ArtSchema = new mongoose.Schema({

    title: String,
    author: String,
    imageUrl: String,
})

const Art = mongoose.model('Art' ,ArtSchema);


mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/Art")


const art = new Art({
    title:"Arabic",
    author:"Hafida",
    imageUrl:"https://i2.wp.com/www.sigmadecoration.com/wp-content/uploads/2020/01/il_794xN.823173583_jbec.jpg?fit=794%2C447&ssl=1",

})


art.save((err, art)=>{
    console.log('err',err)
    console.log('Art',art)
});


app.get('/api',(req, res)=>{
    res.send(art)
})


setTimeout(() => {
    mongoose.connection.close();
}, 5000);

app.listen(port,()=>{
    console.log(`serveur started port:${port}`);
})