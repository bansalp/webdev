var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var uuid = require('node-uuid');
var mongoose = require("mongoose");

var connection_string = "mongodb://localhost/webdevelopment";
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connection_string);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

var secret = process.env.SESSION_SECRET;
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var assignmentUserModel = require("./public/assignment/server/models/user.model.js")(db);
var projectUserModel = require("./public/project/server/models/user.model.js")(db);
var security = require("./public/security/security.js")(assignmentUserModel, projectUserModel);
require("./public/assignment/server/app.js")(app, uuid, db, assignmentUserModel, security);
require("./public/project/server/app.js")(app, db, projectUserModel, security);

app.listen(port, ipaddress);

console.log("Server started...");
