var express = require('express');
var router =  express.Router();
var fileUpload = require('express-fileupload');
var fs = require('file-system');

var User = require('./models/user');

router.use(fileUpload());

router.get('/:username', function (req, res) {
    //console.log('go to the account page');
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

router.get('/:username/upload', function (req, res) {
    //console.log('go to the account page');
    //var username = req.params.username;
    //var user = User.getUser(username);
    var username = req.url.replace('/',"").toString();
    User.getUser(username, function (err, user) {
        console.log("got user");
        if (err) throw err;
        res.render('upload',{
            user : user
        });
    });
});

router.post('/:username/upload', function (req,res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    var username = req.url.split('/')[1];

    var user = {username : username};


    var sampleFile = req.files.sampleFile;
    var progName = req.body.progName;


    var path = __dirname + '/views/Users/' + username + '/' + progName;
    fs.mkdir(path, function (err) {
        if (err) {
            console.log('failed to create directory', err);
            res.render('upload', {
                user:user
            })
        } else {
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv(__dirname + '/views/Users/' + username + '/' + progName + '/' + req.files.sampleFile.name, function (err) {
                if (err)
                    return res.status(500).send(err);

                //res.send('File uploaded!');


                res.redirect('/');
            });
        }
    });

});


module.exports = router;