var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// rebuild this userSchema so as not to be many:many
var UserSchema = new Schema({
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true, select: false},
	todos: [{type: mongoose.Schema.ObjectId, ref: 'Todo'}]
})


UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified){
		return next()
	}
	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err){
			return next(err)
		}
		user.password = hash;
		next()
	})
})

UserSchema.methods.comparePassword = function(password){
	var user = this;
	return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model('User', UserSchema)