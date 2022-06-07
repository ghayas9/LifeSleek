const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
require('dotenv').config()
const multer = require('multer')
const PORT = process.env.PORT || 9000
const jwt = require('jsonwebtoken')

const schedule = require('node-schedule');

const app = express();
const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server,{
    cors: {
      origin: "*",
    },
   })

app.set('socketio', io)
app.use(cors({ origin: '*' }));
app.use(bodyParser.json())
app.use(multer().array())
// for parsing application/xwww-
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@cluster0.knli1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => { console.warn('connected') }).
    catch(() => { console.warn('not connected') });

app.use('/cat', express.static(__dirname + '/Public/Image/CatImage'))
app.use('/pro', express.static(__dirname + '/Public/Image/ProImage'))
app.use('/other', express.static(__dirname + '/Public/Image/OtherImage'))

const UserRouter = require('./Router/User')
const CatRouter = require('./Router/Catagory');
const { verifyToken } = require('./Controllers/auth');
// const checking = require('./Router/checking');

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'ejs');

app.use('/api/v1', UserRouter)

app.get('/',(req,res)=>{
    res.render('LogIn.ejs')
})
// app.use('/cat', CatRouter)
// app.use('/chk', checking)
// app.use('/web', web)

var activeUsers = {}

io.on('connection',(socket)=>{
    socket.on('conn',(data)=>{
        activeUsers[socket.id]= data

        socket.broadcast.emit('users',activeUsers)
        socket.emit('users',activeUsers)

        schedule.scheduleJob(socket.id,"*/5 * * * * *", ()=>{
            console.log('event',`every 5s ${data}`)
            socket.emit('event',`every 5s ${data}`)
          });

        // schedule.scheduleJob(socket.id+'1',"*/6 * * * * *", ()=>{
        //     console.log('event',`every 6s ${data}`)
        //     socket.emit('event',`every 6s ${data}`)
        //   });
    })

    socket.on('disconnect',()=>{
        delete activeUsers[socket.id]
        socket.broadcast.emit('users',activeUsers)
         schedule.cancelJob(socket.id);
        //  schedule.cancelJob(socket.id+'1');
    })

})
// var activeUsers = {}

// io.on('connection',(socket)=>{

//     socket.on('conn',(data)=>{
//         activeUsers[socket.id]= data

//         socket.broadcast.emit('users',activeUsers)
//         socket.emit('users',activeUsers)
//     })

//     socket.on('jsonmessage',({id,message})=>{
//         socket.broadcast.to(id).emit('receviedMessage',message)
//     })

//     socket.on('disconnect',()=>{
//         delete activeUsers[socket.id]
//         socket.broadcast.emit('users',activeUsers)
//     })


//     console.log(activeUsers);
// })

server.listen(PORT,()=>{console.log('localhost:'+PORT)});

