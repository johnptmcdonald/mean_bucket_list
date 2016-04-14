var mongoose = require('mongoose')
var Schema = mongoose.Schema;

// rebuild this userSchema so as not to be many:many
var TodoSchema = new Schema({
	body: {type: String, required: true},
	upvotes: {type: Number},
	users: [{type: String}]
})

TodoSchema.pre('remove', function(next) {
    // remove the todo from any users that reference it
    this.model('User').update(
        {todos: this._id}, 
        {$pull: {todos: this._id}}, 
        {multi: true},
        next
    );
});

module.exports = mongoose.model('Todo', TodoSchema)