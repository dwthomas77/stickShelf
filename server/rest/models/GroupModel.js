var app = require( process.cwd() + '/server/server');
var bookshelf = app.get('bookshelf');

// Define Group Model
var Group = bookshelf.Model.extend({
	tableName: 'groups',

	validate: function() {
		if (!this.get('name') || typeof this.get('name') !== 'string') {
			return "Group Name missing or not valid string";
		}else{
			return false;
		}
	}

});

module.exports = Group;