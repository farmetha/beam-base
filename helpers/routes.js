var routes = require('../routes');
var route_user = require('../routes/user');
var api_user = require('../routes/api/user');

module.exports = function (app, passport) {
    // login and authentication routes.
    app.get('/login', function(req, res) {
        res.send('need to login');
    });
    app.post('/login', passport.authenticate('local', {
            failureRedirect: '/login',
            successRedirect: '/user/dashboard'
        }));
    
    // Basic App pages.
    app.get('/', routes.index);
    app.get('/user/dashboard', isAuthenticated, route_user.dashboard);
    
    // API routes
    app.post('/api/user/create', api_user.register);
};

/**
 * Simple middleware function to ensure authentication.
 */
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}
