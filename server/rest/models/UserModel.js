var app = require( process.cwd() + '/server/server');
var bookshelf = app.get('bookshelf');

// Group Model
var Group = require('./GroupModel')

// Define User Model
var User = bookshelf.Model.extend({

	tableName: 'users',

	group: function() {
		return this.belongsTo(Group);
  	},

	validate: function() {

		var errors = [];
		if (!this.get('first_name') || typeof this.get('first_name') !== 'string') {
			errors.push(' First Name missing or not valid string');
		}
		if (!this.get('last_name') || typeof this.get('last_name') !== 'string') {
			errors.push(' Last Name missing or not valid string');
		}
		if(!/(.+)@(.+){2,}\.(.+){2,}/.test(this.get('email'))){
			errors.push(' Email is not valid');
		}

		if(errors.length > 0){
			return errors.join();
		}else{
			return false;
		}

	}

});

module.exports = User;