const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
require('dotenv').config()
const PORT = process.env.PORT || 9000


app.use(cors({ origin: '*' }));
app.use(bodyParser.json())
// app.use(JSON.stringify())
// app.use();
// for parsing application/xwww-
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
    `mongodb+srv://${process.env.DB_PASSWORD}:ghayas@cluster0.knli1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
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
// const goalRouter = require('./Router/Goal');
const checking = require('./Router/checking');
const appointment = require('./Router/Appointment');
const web = require('./Router/Web');
// const { verify } = require('/Controllers/auth')

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'ejs');



app.use('/user', UserRouter)
app.use('/cat', CatRouter)
// app.use('/goal', goalRouter)
// app.use('/app', appointment)
// app.use('/chk', checking)
// app.use('/web', web)

app.listen(PORT, () => {
    console.log(`localhost:${PORT} `)
})