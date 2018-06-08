var express = require('express');
var router =  express.Router();
var Program = require('./models/program');
var User = require('./models/user');

/* projectsPage '/projectsPage' */
var path = require('path');

router.get('/', function (req, res) {
    /* you can render objects and array with send(object). */
    /* render takes an .ejs file and renders it*/
    res.render('searchProjects');
});

router.post('/', function (req, res) {
    console.log('searching');
    User.getUserByUsername(req.body.username, function (err,user) {
        console.log(user);
        if (err) { throw err}
        else if (user != null) {
            console.log("success");
            res.redirect('/user/' + user.username);
            /*res.render('accountPage',{
                user : user
            })*/
        } else {
            console.log("fail");
            res.render('searchProjects', {
                title: "Program Showcase",
            })
        }
    });

});



router.get('/:username', function (req, res) {
    console.log(req.url);
    //var username = req.params.username;
    //var user = User.getUser(username);
    var username = req.url.replace('/',"").toString();
    User.getUser(username, function (err, user) {
        console.log("got user");
        if (err) throw err;
        else if (user != null) {
            Program.getAllProgramsByUsername(username, function(err,programs) {
                if (err) throw err;
                console.log(programs);
                res.render('userPage',{
                    user : user,
                    programs: programs
                });
            });
        }
    });
});

router.get('/:username/run/:progName', function (req, res) {
    // console.log(req.url);
    // var name = req.url.substr(1, req.url.length - 9);
    var list = req.url.split('/');
    console.log(list);
    var username = list[1];
    var progName = list[3];
    console.log("bring up run page" + username + " " + progName);

    Program.getProgramByUsername(username,progName,function (err, programDetails) {
        if (err) throw err;

        if (!programDetails) {
            res.redirect('/user' + username);
        } else {
            console.log(programDetails);

            res.render('console',{
                program : programDetails,
                username: username,
                account : false
            });
        }
    });
});

/*router.get('/:username/runPage/echo', function (req, res) {
        res.sendFile(path.join(__dirname+'/views/echo.html'),{

});
});*/


module.exports = router;