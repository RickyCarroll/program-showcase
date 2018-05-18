var express = require('express');
var router =  express.Router();

var User = require('./models/user');

router.get('/:username', function (req, res) {
    console.log('go to the account page');
    //var username = req.params.username;
    //var user = User.getUser(username);
    var username = req.url.replace('/',"").toString();
    User.getUser(username, function (err, user) {
        console.log("got user");
        if (err) throw err;
        res.render('accountPage',{
            user : user
        });
    });
});

router.get('/:username/runPage', function (req, res) {
    console.log(req.url);
    var name = req.url.substr(1, req.url.length - 9);
        res.render('runPage', {
            name : name
    });
});

router.get('/:username/runPage/echo', function (req, res) {
    res.render('echo',{
    });
});
module.exports = router;