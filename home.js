var express = require('express');
var router =  express.Router();

var User = require('./models/user');



/* home page '/' */
router.get('/', function (req, res) {
    /* you can render objects and array with send(object). */
    /* render takes an .ejs file and renders it*/
    //db.users.find(function (err,docs) {
    console.log(req.user);
    console.log(req.isAuthenticated());
        res.render('home',{
            title: "Program Showcase",
            //users: docs
        });
        //console.log(docs);
    //});
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.post('/', function (req, res) {
    User.getUser(req.body.username, function (err,user) {
        if (err) { throw err}
        else {
            res.render('/user/' + user.username, {
                user: user
            });
        }
    });
    
})

module.exports = router;
/* login */