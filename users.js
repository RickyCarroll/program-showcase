var express = require('express');
var fs = require('file-system');
var router =  express.Router();

var User = require('./models/user');

/* createAccount '/createAccount' */
router.get('/', function (req, res) {
    console.log('go to the createAccount page');
    res.render('createAccount',{
        title: "Create Account",
        errors: null
    });
});

/* this event is for when someone enters their information. */
router.post('/', function (req,res) {
    console.log('Form Submitted');

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    /*console.log('Success');
    console.log(password);*/

    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid ').isEmail();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'A retyped password is required').notEmpty();
    req.checkBody('password2', 'passwords do not match').equals(req.body.password);

     var errors = req.validationErrors();

    if (errors) {
        console.log("error");
        res.render('createAccount',{
            title: "Create Account",
            errors:errors
        });
    }

    User.getUserByUsername(username, function(err, user) {
        if (user) {
            console.log(user + ' match');

            /* msg to the user! */
            req.checkBody('username', ' please enter a different name.').equals(!username);
            var errors = ['That username is already used by another user.'];

            console.log("error");
            res.render('createAccount', {
                title: "Create Account",
                error: errors
            });
        }else{

            console.log(username);
            var newUser = new User({
                username: username,
                email: email,
                password: password
            });


            /* put the new user in the DB*/
            User.createUser(newUser, function(err, user){
                if(err) throw err;
                console.log(user);
            });

            var path = __dirname + '/views/Users/' + username;

            fs.mkdir(path, function (err) {
                if (err) {
                    console.log('failed to create directory', err);
                }
            });
            req.flash('success_msg', 'Your account has been created and now you can login.');
            console.log("Success!");
            console.log("redirecting... account has been made");
            res.redirect('/login');
        }
    });

    /*This would be used if we were using mongo db. */
    /*db.users.insert(newUser,function (err,result) {
        if (err) {
            console.log(err);
        }
        //res.redirect('/'); /!* takes the user back to the main website. *!/
    });*/

});

module.exports = router;