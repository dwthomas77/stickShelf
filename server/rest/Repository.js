var app = require( process.cwd() + '/server/server');
var bookshelf = app.get('bookshelf');

// Group model + collection
var _groupModel = require('./models/GroupModel');
var _groups;

_groupModel.collection().fetch()
	.then(function(collection){
		_groups = collection;
	});

var Repository = Repository || {

	getGroupCollection: function() { 
		return collection;
	}

};

// export the router
module.exports = Repository;