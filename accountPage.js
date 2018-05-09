var express = require('express');
var router =  express.Router();

var User = require('./models/user');

router.get('/:username', function (req, res) {
    console.log('go to the account page');
    //var username = req.params.username;
    //var user = User.getUser(username);
    var username = req.url.replace('/',"").toString();
    console.log(username);
    var userInfo = User.getUser(username, function (err, user) {
        console.log("got user");
        if (err) throw err;
        res.render('accountPage',{
            user : user
        });
    });

});




module.exports = router;