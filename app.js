var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const flash = require('connect-flash');


var regRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var homeRouter = require("./routes/home");
const adminRouter= require("./routes/adminLog");
const adminDashRouter = require("./routes/adminDash");
const validate = require('./middleware/Validate');
const userIDRouter = require('./routes/edit');
const sortRouter = require('./routes/sort');
const searchRouter = require('./routes/search');
require('dotenv').config();

// the the data base connection is starting from here
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

connectToMongoDB();
var app = express();
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000000 }
}));

app.use(flash());





app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg');
  res.locals.addedUser = req.flash('addedUser');
  res.locals.deletedUser = req.flash('deletedUser');
  next();
});
app.use('/',regRouter);
app.use('/login',loginRouter);
app.use('/home',homeRouter);
app.use('/',adminRouter);
app.use('/dashboard',adminDashRouter);
app.use('/',userIDRouter);
app.use('/sort',sortRouter);
app.use('/',searchRouter);



app.get('/logout',(req , res)=>{
  req.session.destroy((err) => {
    if (err) {
        console.log(err);
    }
    res.redirect('/login');
})
})

app.get('/logouts',(req , res)=>{
  req.session.destroy((err) => {
    if (err) {
        console.log(err);
    }
    res.redirect('/admin');
})
})


module.exports = app;


