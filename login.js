var express = require('express');
var router =  express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user');

router.get('/', function (req, res) {
    console.log('go to the login page');
    console.log('testing the git');
    res.render('login',{
        title: "User login"
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        /*console.log("getting user");*/
        User.getUserByUsername(username, function (err,user) {
            console.log("got user");
            if (err) throw err;
            console.log(user.username);
            console.log(user.password);
            if (!user){
                return done(null,false,{message: 'Unknown User'})
            }
            /*console.log("checking passwords");
            console.log(password);*/
            User.comparePassword(password, user.password, function (err, isMatch) {
                /*console.log("producing results");*/
                if (err)
                    throw err;
                alert(err);
                if (isMatch) {
                    console.log("success!");
                    return done(null,user);
                } else {
                    console.log("failure");
                    alert("failure");
                   return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login',failureFlash: true}),
    function (req,res) {
        res.redirect('/');
    });

module.exports = router;

