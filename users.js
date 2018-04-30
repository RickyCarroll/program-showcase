var express = require('express');
var router =  express.Router();

/* createAccount '/createAccount' */
router.get('/createAccount', function (req, res) {
    console.log('go to the createAccount page');
    res.render('createAccount',{
        title: "Create Account"
    });
});

/* this event is for when someone enters their information. */
app.post('/newUser', function (req,res) {
    console.log('Form Submitted');

    var newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    console.log('Success');

    res.render('newUser',{
        title: "Account Created!",
        user: newUser
    });

    /*This would be used if we were using mongo db. */
    db.users.insert(newUser,function (err,result) {
        if (err) {
            console.log(err);
        }
        //res.redirect('/'); /* takes the user back to the main website. */
    });

});