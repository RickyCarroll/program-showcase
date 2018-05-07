var express = require('express');
var router =  express.Router();


/* home page '/' */
router.get('/', function (req, res) {
    /* you can render objects and array with send(object). */
    /* render takes an .ejs file and renders it*/
    //db.users.find(function (err,docs) {
        res.render('home',{
            title: "Program Showcase",
            //users: docs
        });
        //console.log(docs);
    //});
});

module.exports = router;
/* login */