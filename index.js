const express=require('express');
const app =express();
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
const cors =require('cors');
const multer = require("multer");
const path = require("path");
require('dotenv').config()
const PORT = process.env.PORT ||9000


app.use(cors({origin:'*'}),bodyParser.json());
// app.use();
// for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
    `mongodb+srv://${process.env.DB_PASSWORD}:ghayas@cluster0.knli1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => { console.warn('connected') }).
catch(()=>{console.warn('not connected')});


const UserRouter = require('./Router/User')

app.use('/user',UserRouter)

app.listen(PORT,()=>{
    console.log(`localhost:${PORT} `)
})