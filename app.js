const express = require('express')
const web=require('./routes/web')
const app = express()
const port = 6500
const fileUpload = require("express-fileupload");
app.use(fileUpload({useTempFiles: true}));
const cloudinary = require('cloudinary');
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const api=require('./routes/api')

//message showing 
app.use(session({
  secret:'secret',
  cookie: {maxAge:60000},
  resave: false,
  saveUninitialized:false,

}));
app.use(flash());











//for submitting the form
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())






//database connection
const connectDB=require('./db/connectdb')
connectDB()


//routing page is called
app.use('/',web)
//localhost:6500



//api routing
app.use('/api',api)
//localhost:6500/api



//ejs setup
app.set('view engine','ejs')


//for using the images
app.use(express.static('public'))



//this is for creating the portss
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





