var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../../config')
var userController = require('../controllers/userController')
var authController = require('../auth/authController')
var authMiddleware = require('../auth/authMiddleware')



module.exports = function(app,express){
	var userRouter = express.Router()

	userRouter.post('/authenticate', authController.issueToken)
	userRouter.post('/', userController.create)
	userRouter.get('/', userController.index)
	userRouter.get('/me', authMiddleware.verifyToken, userController.me)
	userRouter.get('/:user_id', userController.show)

	return userRouter;
}
