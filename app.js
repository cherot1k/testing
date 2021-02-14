require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const session = require('express-session')
const redis = require('redis')
const  redisStorage = require('connect-redis')(session)
const database = require('./database/init')
const client  = redis.createClient();
const {UserController} = require('./database/user')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()


// view engine setup
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: false
}))

require('./auth/init').initPassport()

app.use(passport.initialize())
app.use(passport.session())
app.use(session({
  store: new redisStorage({
    host: 'localhost', port: 6379, client: client,ttl :  260
  }),
  secret: 'mySecret',
  resave: false,
  saveUninitialized: false
}))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404))
// });

app.get('/user', (req,res)=>{
    res.send('No')
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (err, req, res, next) => {
    if (err) next(err);
    console.log('You are logged in!');
});

app.get('/profile', (req,res)=>{
  res.send('c++')
})

app.listen(process.env.PORT, ()=>{
  database.connectDB()
  console.log('Server is listening on port ' + process.env.PORT)
})



module.exports = app;
