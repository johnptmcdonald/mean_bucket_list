var jwt = require('jsonwebtoken');
var config = require('../../config');

function verifyToken(req, res, next){
	var token = req.body.token || req.param('token') || req.headers['x-access-token']
	if(token){
		jwt.verify(token, config.secret, function(err, decoded){
			if(err){
				res.status(403).send({
					success: false,
					message: 'failed to authenticate token'
				})
			} else {
				console.log("jwt verified")
				req.currentUser = {
					id: decoded._id,
					username: decoded.username
				};
				console.log(req.currentUser)
				next()
			}
		})
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token'
		})
	}
}

module.exports = {
	verifyToken: verifyToken
}