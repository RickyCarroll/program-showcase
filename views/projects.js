var express = require('express');
var router =  express.Router();

/* projectsPage '/projectsPage' */
router.get('/projectsPage', function (req, res) {
    /* you can render objects and array with send(object). */
    /* render takes an .ejs file and renders it*/
    res.render('projectsPage');
});