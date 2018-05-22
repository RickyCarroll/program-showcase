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
            res.render('accountPage', {
                user: user
            });
        } else {
            res.render('searchProjects', {
                title: "Program Showcase",
            })
        }
    });

});

module.exports = router;