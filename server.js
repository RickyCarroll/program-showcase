/* run in the terminal: npm init
 *the --save flag adds it to the .json file
 * npm install ejs --save
 * npm install express-validator --save
  * maybe we should do mongodb
  * if so we should check out mongojs -> npm install mongojs --save */

/*const http = require('http');
const file = require('fs');*/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
/* This is used to validate the user input.
 * this requires some middle ware */
var expressValidator = require('express-validator');

var app = express();

/* this is middle ware and it is used to preform a task
 * in between the request and the response.
 * it was access to both the request and the response and
 * it will run every time the application is loaded. */
var logger = function (request, response, next) {
    console.log('Logging...');
    next();
};
app.use(logger);

/* View Engine */
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

/* Body Parser Middleware*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* Set Static Path to templates which is where the html/css is. */
app.use(express.static(path.join(__dirname,'views')));

/* Express validator error formatter. */
app.use(expressValidator());

/* global variables */
app.use(function (req,res,next) {
    res.locals.errors = null;
    next();
})

var users = [
    {
        id: 1,
        username: 'John',
        password : 'Doe',
        email: 'johndoe@gmail.com',
    },
    {
        id: 2,
        username : 'Bob',
        password : 'Doe',
        email: 'bobdoe@gmail.com',
    },
    {
        id: 3,
        username : 'Jill',
        password : 'Doe',
        email: 'jilldoe@gmail.com',
    }
]


/* home page '/' */
app.get('/', function (req, res) {
    /* you can render objects and array with send(object). */
    /* render takes an .ejs file and renders it*/
    res.render('home',{
        title: "Program Showcase"
    });
});

/* createAccount '/createAccount' */
app.get('/createAccount', function (req, res) {
    /* you can render objects and array with send(object). */
    /* render takes an .ejs file and renders it*/
    console.log('go to the createAccount page');
    res.render('createAccount',{
        title: "Create Account",
        users: users
    });
});

/* newUser '/submit' */
/*app.get('/submit', function (req, res) {
    /!* you can render objects and array with send(object). *!/
    /!* render takes an .ejs file and renders it*!/
    console.log('go to the submit page');
    res.render('newUser',{
        title: "Account Created!",
        users: users
    });
});
*/

/* this event is for when someone enters their information. */
app.post('/createAccount', function (req,res) {
    console.log('Form Submitted');

    req.checkBody('username','Username is Required').notEmpty();
    req.checkBody('email','Email is Required').notEmpty();
    req.checkBody('password','Password is Required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('createAccount',{
            title: "Program Showcase",
            users: users,
            errors: errors
        });
        console.log('ERRORS');

    } else {
        res.render('newUser',{
            title: "Account Created!",
            users: users
        });
        var newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        console.log('Success');
        /*This would be used if we were using mongo db. */
        /*db.user.insert(newUser,function (err,result) {
            if (err) {
                console.log(err);
            }
            res.redirect('/'); /!* takes the user back to the main website. *!/
        })*/
    }

});

/* This listens for including requests for the website. */
app.listen(8000,function () {
    console.log('Server Started on Port 8000...');

});

/*file.readFile('templates/frontpage.html',(err,html) => {
    if(err){
        throw err;
    }

    http.createServer((request,response) => {
        console.log("A user made a request" + request.url);
        /!* 200 means accept and text/html means write html *!/

       /!* response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();*!/

        /!* handling a request:
         * get the method and url from the request object *!/
        const { method,url} = request;
        /!* next get the headers from the request object *!/
        const { headers } = request;
        const userAgent = headers['user-agent'];
        /!* grab the data right out of the stream and
         * put it into body. *!/
        let body = [];
        /!* print any errors that come from request *!/
        request.on('error',(err) => {
            console.error(err.stack);
        });
        /!* get the data *!/
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
        });



    }).listen(8000, () => {
        console.log("Server is now running....");
    });
});
/!* The request object is info about the user's request.
 * The response is the object that is being sent back to
  * the user. It may contain an error or some kind of accept. *!/*/

