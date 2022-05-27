const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
require('dotenv').config()
const PORT = process.env.PORT || 9000


app.use(cors({ origin: '*' }));
app.use(bodyParser.json())
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
const checking = require('./Router/checking');

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'ejs');

app.use('/api/v1', UserRouter)
app.use('/cat', CatRouter)
// app.use('/chk', checking)
// app.use('/web', web)

app.listen(PORT, () => {
    console.log(`localhost:${PORT} `)
})