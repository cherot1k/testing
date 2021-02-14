const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const {UserController} = require('../database/user')
const {middleware} = require('./middleware')



passport.serializeUser(function (user, cb) {
    cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
    let user = UserController.findOne(username)
    cb(null, user)
})

function initPassport () {
    passport.use('local',new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function(username, password, done) {
            UserController.findOne({ username: username }).then(user =>{
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                if (user.password !== 'Sasha'){
                    return done(null,false)
                }

                return done(null, user);
            }).catch((err) => done(err))
        }
    ), );
    // passport.authenticationMiddleware = middleware
}

module.exports = {initPassport}


// bcrypt.compare(password, user.password,(err, isValid)=>{
//     if(err){
//         return done(err)
//     }
//     if(!isValid){
//         return done(null,false)
//     }
// })