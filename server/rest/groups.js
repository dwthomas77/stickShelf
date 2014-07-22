// express + app + bookshelf
var express = require('express');
var app = require( process.cwd() + '/server/server');
var bookshelf = app.get('bookshelf');

// lodash for binding and stuff
var _ = require('lodash');

// Group model
var Group = require('./models/GroupModel');

var router = express.Router();

// Group Endpoint - Fetch by ID (GET) or Delete by ID (DELETE)
router.use('/:id', function(req, res) {

	// bind this response to error function
	var returnError = returnErrorFunc(res);

	new Group({'id': req.params.id})
		.fetch()
		.then(function(group) {
			// if group is not returned, then return error
			if(!group){
				returnError('Group ID '+req.params.id+' was not found in the database.');
			}else{
				// GET Group by ID
				if(req.method === 'GET'){
					res.json(200, group.toJSON());
				// PUT Group changes by ID
				}else if(req.method === 'PUT'){
					group.save(req.body)
						// then return success message to the UI
						.then(function(){
							res.json(200, {
								"msg" : 'Group '+req.params.id+' successfully updated in database.'
							});
						});
				// DELETE Group by ID
				}else if(req.method === 'DELETE'){
					// delete the group from the table
					group.destroy()
						// then return success message to the UI
						.then(function(){
							res.json(200, {
								"msg" : 'Group '+req.params.id+' successfully deleted from database'
							});
						});
				}
			}
		});
});

// Groups Endpoint - Fetch All (GET) or Add new Group (POST)
router.use('/', function(req, res) {
	
	// bind this response to error function
	var returnError = returnErrorFunc(res);

	// GET all groups
	if(req.method === 'GET'){
		Group.collection().fetch().then(function(collection) {
			if(collection.isEmpty()){
				returnError('No Group objects found in database.');
			}else{
				res.json(collection.toJSON());
			}
		});
	// POST new group
	}else if(req.method === 'POST'){
		// confirm body of request
		if(!req.body){
			returnError('Required parameters for new Group were not provided.');
		}else{
			// build model from payload
			var group = new Group(req.body);
			// validate model
			var validationError = group.validate();
			if(validationError) {
				returnError(validationError);
			}else{
				group.save().then(function(model) {
					res.json(200, {
						"msg" : "Group Model ID " + model.get('id') +  " Successfully Added"
					})
				});
			}
		}
	// if method not supported return error
	}else{
		returnError('The method ' + req.method + ' is not supported by this endpoint.');
	}
});

module.exports = router;

// * -- global functions -- *

// function to handle returning error messages
function returnErrorFunc(res){
	return function(str){
		res.json(404, {
			"error" : {
				"msg" : str
			}
		});
	};
}

