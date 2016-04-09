var bodyParser = require('body-parser');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var Todo = require('../models/todo')
var todoController = require('../controllers/todoController')
var authMiddleware = require('../auth/authMiddleware')

module.exports = function(app,express){
	var todoRouter = express.Router()

	todoRouter.use(authMiddleware.verifyToken)	

	todoRouter.post('/', todoController.create)
	todoRouter.get('/', todoController.index)
	todoRouter.put('/:todo_id/vote', todoController.vote)
	todoRouter.delete('/:todo_id', todoController.destroy)

	return todoRouter;
}
