// require express
var express = require('express')
var app = express();

// require body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// for local connection string
 var connectionString =   'mongodb://127.0.0.1:27017/movie-buddies';


// check if running remotely
if(process.env.MONGODB_URI) {
    connectionString = process.env.MONGODB_URI;
}

// create connection to mongodb
var mongoose = require('mongoose');
var global = mongoose.connect(connectionString,{useNewUrlParser : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected with mongoose');
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        req.headers.origin);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


const userService = require('./services/user.service.server');
userService(app);
const eventService = require('./services/event.service.server');
eventService(app);
const movieService = require('./services/movie.service.server');
movieService(app);
const bookingService = require('./services/booking.service.server');
bookingService(app);

app.listen(process.env.PORT || 5500, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});