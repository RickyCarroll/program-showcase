var express = require('express');
var router =  express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var session = require('express-session');

var User = require('./models/user');



router.get('/', function (req, res) {
    console.log('go to the login page');
    console.log(req.url);
    res.render('login',{
        title: "User login"
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("getting user");
        User.getUserByUsername(username, function (err,user) {
            console.log("got user");
            if (err) throw err;
            //console.log(user.username);
            //console.log(user.password);
            if (!user){
                console.log("Unknown User");
                return done(null,false,{message: 'Unknown User'})
            }
            /*console.log("checvking passwords");
            console.log(password);*/
            User.comparePassword(password, user.password, function (err, isMatch) {
                /*console.log("producing results");*/
                if (err)
                    throw err;
                console.log(err);
                if (isMatch) {
                    console.log("success!");
                    return done(null,user);
                } else {
                    console.log("failure");
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
        //console.log("deserialize " + user + " all done");
        done(err, user);
    });
});

router.post('/',
    passport.authenticate('local', {failureRedirect:'/login',failureFlash: true}),
    function (req,res) {
        /*var loginUser = User.getUserID(req.body.username);
        req.login(loginUser, function(err) {
            if (err) {
                console.log(err);
            }
        });*/

        /* create the session (cookie) */
        if (!req.session.userName && !req.session.visitCount) {
            req.session.userName = req.body.username;
            req.session.visitCount = 1;
            //res.status(201).send(req.session);
        } else {
            req.session.visitCount += 1;
            //res.status(200).send(req.session);
        }

        console.log('the session ' + req.session.userName);

        res.redirect('/account/' + req.body.username);
    });

module.exports = router;

