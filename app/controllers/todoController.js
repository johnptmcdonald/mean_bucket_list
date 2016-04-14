var bodyParser = require('body-parser');
var Todo = require('../models/todo')
var User = require('../models/user');


function index(req, res){
	Todo.find(function(err, todos){
		if(err){
			res.send(err)
		}
		res.json(todos)
	})
}

function create(req, res){
	var todo = new Todo()
	todo.body = req.body.body;
	todo.upvotes = 0;
	console.log(req.currentUser.username)
	todo.users.push(req.currentUser.username)
	
	User.findById(req.currentUser.id, function(err, user){
		console.log(req.currentUser.username)
		if(err){
			return next(err)
		}

		todo.save(function(err, todo){
			if(err){
				return res.send(err)
			}
		
			user.todos.push(todo)
			user.save(function(err, user){
				if(err){
					return res.send(err)
				}
				res.json({
					success: true,
					message: "New todo created"
				})		
			})
		})
	});
		
}

function vote(req, res){
	var operation;
	Todo.findById(req.params.todo_id, function(err, todo){
		if(err){
			res.send(err)
		}
		User.findById(req.currentUser, function(err, user){
			if(err){
				res.send(err)
			}
			
			if(user.todos.indexOf(todo._id) >= 0){
				user.todos.splice(user.todos.indexOf(todo._id), 1)
				todo.users.splice(todo.users.indexOf(req.currentUser), 1)
				operation = "removed from"

			} else {
				todo.users.push(req.currentUser)
				user.todos.push(todo._id)
				operation = "added to"

			}

			user.save(function(err, user){
				if(err){
					res.send(err)
				}
				res.json({
					success: true,
					message: "todo " + operation + " your list",
				})
			})	

			todo.save(function(err, todo){
				if(err){
					res.send(err)
				}
			})		
		})
	})
}

function destroy(req, res){
	Todo.findById(req.params.todo_id, function(err, todo){
		if(err){
			res.send(err)
		}
		todo.remove()
		res.json({
			success: true,
			message: "todo deleted"
		})
	})
}

module.exports = {
	create: create,
	index: index,
	destroy: destroy,
	vote: vote
}