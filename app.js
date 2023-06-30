var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var homeRouter = require("./routes/home");
const validate = require('./middleware/Validate');



var app = express();

var users = []

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10000 }
}));




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register',regRouter);
app.use('/login',loginRouter);
app.get('/home',validate,(req, res)=>{
  res.render('home',{ name :s});
})




// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
//   next();
// });
var s;
app.post('/register', (req, res) => {
  const {name, password , email} = req.body;
    s = req.body.name;
    if(name === ""  || password === ""){
      res.render('register');
    }else{
      users.push(name,password,email);
      console.log(users);
      res.render('login');
    }
 
});

app.get('/logout',(req , res)=>{
  req.session.destroy((err) => {
    if (err) {
        console.log(err);
    }
    res.redirect('/login');
})
})

app.post('/login',(req , res)=>{
  console.log("checking for the loggin");
  const {logname, logpassword} =req.body;
  // console.log(logpassword);
  if(users.includes(logpassword) && users.includes(logname)){
    req.session.loggedIn = true;
    res.redirect('/home');
   
  }else{
    res.redirect("/login");
  }
    
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


