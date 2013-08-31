var mongoose = require('mongoose');
var db;
var User = require('../../models/user.js');
var testUser = null;

module.exports = {
    setUp: function (callback) {
        mongoose.connection.on('open', function () {
            testUser = new User({
                'username': 'testuser',
                'password': 'password'
            });
            testUser.save(function (err, user) {
                if (err) {
                    console.log(err.message);
                }
                callback();
            });
        });
        db = mongoose.connect('mongodb://localhost/beam-base-test');
    },

    tearDown: function (callback) {
        testUser.remove();
        db.disconnect();
        callback();
    },

    testPassword: function (test) {
        test.expect(6);
        test.notEqual(testUser.hashed_password, 'password');
        test.equal(testUser.hashed_password, testUser.hashPassword('password'));
        test.ok(testUser.checkPassword('password'));
        test.equal(false, testUser.checkPassword('blah'));
        test.notEqual('', testUser.generateSalt('password'));
        test.notEqual(null, testUser.generateSalt('password'));
        test.done();
    }

};
