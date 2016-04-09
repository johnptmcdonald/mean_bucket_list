var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var User = require('./app/models/user')
var userRouter = require('./app/routes/userRoutes')(app,express)
var todoRouter = require('./app/routes/todoRoutes')(app,express)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-COntrol-Allow-Headers', 'X-Requested-With, content-type,Authorization')
	next();
})

app.use(morgan('dev'))

app.use('/api/users', userRouter)
app.use('/api/todos', todoRouter)

app.use(express.static(__dirname + '/public'))
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
})

mongoose.connect('localhost:27017')

app.listen(8080, function(){
	console.log("listening on 8080")
})