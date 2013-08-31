var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var config = require('../config.json');

var UserSchema = new Schema({
    username: { type: String, required: true, index: {unique: true} },
    hashed_password: { type: String, required: true },
    salt:  {type: String}
});

UserSchema.virtual('password')
    .set(function(password) {
        this.salt = this.generateSalt();
        this.hashed_password = this.hashPassword(password);
    });

UserSchema.methods = {
    checkPassword: function (password) {
        password = this.hashPassword(password);
        return (password === this.hashed_password);
    },

    hashPassword: function (password) {
        return crypto.createHmac('sha1', config.hash_secret)
            .update(password + this.salt).digest('hex');
    },

    generateSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('User', UserSchema);
