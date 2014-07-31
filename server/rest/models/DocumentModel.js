var app = require( process.cwd() + '/server/server');
var bookshelf = app.get('bookshelf');

// User Model
var User = require('./UserModel')

// Define Document Model
var Document = bookshelf.Model.extend({

	tableName: 'documents',

	user: function() {
		return this.belongsTo(User);
 	},

	validate: function() {

		var errors = [];
		if (!this.get('title') || typeof this.get('title') !== 'string') {
			errors.push(' Title missing or not valid string');
		}
		if (!this.get('body') || typeof this.get('body') !== 'string') {
			errors.push(' Body missing or not valid string');
		}

		if(errors.length > 0){
			return errors.join();
		}else{
			return false;
		}

	}

});

module.exports = Document;