var mongoose = require('mongoose');

exports.register = function (req, res) {
    var User = mongoose.model('User');
    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save();
    res.json({id: newUser._id});
};
