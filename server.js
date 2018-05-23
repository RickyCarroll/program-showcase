/* run in the terminal: npm init
 *the --save flag adds it to the .json file
 * npm install ejs --save
 * npm install express-validator --save
  * maybe we should do mongodb
  * if so we should check out mongojs -> npm install mongojs --save */


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/* This is used to validate the user input.
 * this requires some middle ware */
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codex');
var db = mongoose.connection;

var home = require('./home');
var users = require('./users');
var projects = require('./projects');
var login = require('./login');
var accountPage = require("./accountPage");
var runPage = require("./runPage");
var search = require('./searchProjects');
var about = require('./about');
var jquery = require('jquery');


//var account = require('./accountPage');

var app = express();

/*/!* this is middle ware and it is used to preform a task
 * in between the request and the response.
 * it was access to both the request and the response and
 * it will run every time the application is loaded. *!/
var logger = function (request, response, next) {
    console.log('Logging...');
    next();
};
app.use(logger);*/

/* View Engine */
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);

/* Body Parser Middleware*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/* Set Static Path to templates which is where the html/css is. */
app.use(express.static(path.join(__dirname,'views')));

/* Express Session */
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false
}));

/* Passport init */
app.use(passport.initialize());
app.use(passport.session());


/* Express validator error formatter. */
app.use(expressValidator());

app.use(flash());

/* global variables */
app.use(function (req,res,next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
/*app.use(function (req,res,next) {
    res.locals.errors = null;
    next();
});*/

app.use('/', home);
app.use('/createAccount', users);
app.use('/projectsPage', projects);
app.use('/login', login);
app.use('/user', accountPage);
app.use('/searchProjects', search);
app.use('/about', about);

//app.use('/user/runPage',  runPage);

//app.use('/accountPage', account);





/* newUser '/submit' */
//app.post('/submit', function (req, res) {
    /* you can render objects and array with send(object). */
    /* render takes an .ejs file and renders it*/
  //  console.log('go to the new user page');
    //res.render('newUser',{
      //  title: "Account Created!",
    //});
//})




/*app.post('/', function (req,res) {
    console.log('user logged in');
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    console.log(newUser.username + " " + newUser.email);
    var account = db.users.findOne(({username:newUser.username.toString(),email:newUser.email.toString()}));
    if (account.password.toString() === newUser.password.toString()){
        console.log(account.password.toString());
        console.log(newUser.password.toString());
        res.render('user',{
            title: "Account Created!",
            user: newUser
        });
    }

});*/


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

