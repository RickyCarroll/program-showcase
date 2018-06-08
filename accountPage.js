var express = require('express');
var router =  express.Router();
var fileUpload = require('express-fileupload');
var fs = require('file-system');
var Program = require('./models/program');


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
        else if (user != null) {
            Program.getAllProgramsByUsername(username, function(err,programs) {
                if (err) throw err;
                console.log(programs);
                res.render('accountPage',{
                    user : user,
                    programs: programs
                });
            });
}
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

    var newProg = new Program({
        username: username,
        programName: progName,
        mainProgram: sampleFile.name
    });
    
    Program.addProgram(newProg,function (err, newProg) {
       if (err) console.log(err);
       console.log(newProg);
    });


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


                res.redirect('/account/'+ username);
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
            res.redirect('/account' + username);
        } else {
            console.log(programDetails);

            res.render('console',{
                program : programDetails,
                username: username,
                account : true
            });
        }
    });
});


module.exports = router;