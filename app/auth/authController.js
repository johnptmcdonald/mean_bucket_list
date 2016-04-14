var jwt = require('jsonwebtoken');
var config = require('../../config');
var User = require('../models/user');

function issueToken(req, res){
	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err, user){
		if(err){
			throw err
		}
		if(!user){
			res.json({
				success: false,
				message: "Authentication failed, user not found"
			})
		} else if(user){
			var validPassword = user.comparePassword(req.body.password)
			if(!validPassword){
				res.json({
					success: false,
					message: "password doesn't match username"
				})
			} else {
				var token = jwt.sign({
					username: user.username,
					_id: user._id
				}, config.secret, {
					expiresInMinutes: 1440
				})
				res.json({
					success: true,
					message: "Auth successful, enjoy this nice token",
					token: token
				})
			}
		}
	})
}

module.exports = {
	issueToken: issueToken
}