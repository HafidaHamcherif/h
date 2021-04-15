require('dotenv').config();
const express = require('express');
const mongoose = require ('mongoose');

const ArtModel = require('./models/art');

const {PORT, MONGODB_URI} = process.env

const port = PORT || 3000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());



mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/Art",{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err) => {
    if(err != null){
        console.log('DB is not connectess err', err)
        return;
    }
    console.log('DB is connectes')
});


app.get('/',(req, res)=>{
    res.send('back api')
})

app.get('/art',(req,res) => {
    console.log('get/art');
    ArtModel.find({}, (err, art) => {
        if(err !== null) {
            res.json({
                success: false,
                message: err.toString()
            });
            return;
        }
        res.json({
            success: true,
            data: art
        });
    });
});

app.get("/art/:id",(req,res) => {
    console.log('get/art/:id');
    console.log('get/art/:id req.params', req.params);
    ArtModel.findById(req.params.id, (err , art)=>{
        if (err !== null){
            res.json({
                success: false,
                message:err.toString()
            });
            return;
        }
        res.json({
            sucess: true,
            data: art
        });
    });
});

app.put("/art/:id", (req,res) =>{
    console.log('put/art/:id');
    console.log('put/art/:id req.query', req.query);

    ArtModel.updateOne({
         _id: req.params.id 
        },
        { 
            title : req.query.title
        }, 
        (err ,status) =>{
            if(err !== null) {
                res.json({
                    success: false,
                    message: err.toString()
                });
                return
            }
            res.json({
                success: true,
                data: 'update has been successful'
            });

    });
});

app.post('/art',(req,res) => {
    console.log('post/art');
    console.log('post/art req.body', req.body)

    const {
        title = '',
        auteur = '',
        imageUrl = ''
    } = req.body;
    const art = new ArtModel({
        title,
        auteur,
        imageUrl
    });
    art.save((err, art)=>{
        if(err !== null){
            res.json({
                success: false,
                message: err.toString()
            });
            return;
        }
        res.json({
            sucess: true,
            data: art
        });
    });
});





app.listen(port,()=>{
    console.log(`serveur started port:${port}`);
})