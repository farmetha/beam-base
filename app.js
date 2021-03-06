
/**
 * Module dependencies.
 */

var config = require('./config.json');

var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');

// setup the model
var models_path = __dirname + '/models';
var mongoose = require('mongoose');
mongoose.connect(config.mongoose.uri, config.mongoose.options);

fs.readdirSync(models_path).forEach(function (file) {
    if (file.indexOf('.') !== 0 && file.indexOf('.js')) {
        require(models_path + '/' + file);
        console.log(file);
    }
});

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
       var User = mongoose.model('User');

        User.findOne({username: username}, function (err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, { message: 'incorrect_login' });
            }
            if (!user.checkPassword(password)) {
                return done(null, false, { message: 'incorrect_login'});
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    var User = mongoose.model('User');
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


var app = express();

// all environments
app.set('env', config.env || app.get('env'));
app.set('port', config.port || process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1523j8adsf'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./helpers/routes.js')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
