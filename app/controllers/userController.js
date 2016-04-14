var bodyParser = require('body-parser');
var User = require('../models/user');

function create(req, res){
	var user = new User()
	user.username = req.body.username;
	user.password = req.body.password;
	user.todos = [];

	user.save(function(err){
		if(err){
			if(err.code === 11000){
				return res.json({
					success: false,
					message: "That user already exists"
				})
			} else {
				return res.send(err)
			}
		}
		console.log("success creating user")
		res.json({
			success: true,
			message: "User created"
		})
	})
}

function index(req, res){
	User.find(function(err, users){
		if(err){
			res.send(err)
		}
		res.json(users)
	})
}

function show(req, res){
	User.findById(req.params.user_id).populate('todos').exec(function(err,data){
		if(err) res.send(err)
		res.send(data)
	})
}

function me(req, res){
	console.log(req.currentUser)
	User.findById(req.currentUser.id, function(err, user){
		if(err){
			res.send(err)
		} else {
			res.json(user)
		}
	})
}

module.exports = {
	create: create,
	index: index,
	show: show,
	me: me
}