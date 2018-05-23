var express = require('express');
var router =  express.Router();
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
        res.sendFile(path.join(__dirname+'/views/jqconsole/demos/index.html'), {
    });
});

/*router.get('/:username/runPage/echo', function (req, res) {
        res.sendFile(path.join(__dirname+'/views/echo.html'),{

});
});*/
module.exports = router;