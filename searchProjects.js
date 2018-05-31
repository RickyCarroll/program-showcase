var express = require('express');
var router =  express.Router();
var User = require('./models/user');
/* projectsPage '/projectsPage' */

router.get('/', function (req, res) {
    /* you can render objects and array with send(object). */
    /* render takes an .ejs file and renders it*/
    res.render('searchProjects');
});

router.post('/', function (req, res) {
    console.log('searching');
    User.getUserByUsername(req.body.username, function (err,user) {
        console.log("searching");
        console.log(user);
        if (err) { throw err}
        else if (user != null) {
            res.redirect('/user/' + user.username);
        } else {
            res.render('searchProjects', {
                title: "Program Showcase",
            })
        }
    });

});

var path = require('path');
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
    // console.log(req.url);
    // var name = req.url.substr(1, req.url.length - 9);
    console.log("bring up run page");
    res.sendFile(path.join(__dirname+'/views/jqconsole/demos/console.html'), {
    });
});

/*router.get('/:username/runPage/echo', function (req, res) {
        res.sendFile(path.join(__dirname+'/views/echo.html'),{

});
});*/
module.exports = router;


module.exports = router;