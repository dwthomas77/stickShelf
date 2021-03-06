// express + app + bookshelf
var express = require('express');
var app = require( process.cwd() + '/server/server');
var bookshelf = app.get('bookshelf');

// lodash for binding and stuff
var _ = require('lodash');

// Group model
var Group = require('./models/GroupModel');

// declare the router
var router = express.Router();

// GROUPS API (/rest/groups)
router.route('/')

	// Fetch All Groups (GET)
	.get(function(req, res) {
	
		// bind this response for error handling
		var returnError = returnErrorFunc(res);

		Group.collection().fetch()
			.then(function(collection) {
				res.json(collection.toJSON());
			});

	})

	// Add new Group (POST)
	.post(function(req, res) {
		
		// bind this response to error function
		var returnError = returnErrorFunc(res);

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

	});


// GROUP API (/rest/groups/:id)
router.route('/:id')

	// Fetch by ID (GET)
	.get(function(req, res) {

		// bind this response to error function
		var returnError = returnErrorFunc(res);

		new Group({'id': req.params.id})
			.fetch()
			.then(function(group) {
				// if group is not returned, then return error
				if(!group){
					returnError('Group ID '+req.params.id+' was not found in the database.');
				}else{
					res.json(200, group.toJSON());
				}
			});
	})

	// Update by ID (PUT)
	.put(function(req, res) {

		// bind this response to error function
		var returnError = returnErrorFunc(res);

		new Group({'id': req.params.id})
			.fetch()
			.then(function(group) {
				// if group is not returned, then return error
				if(!group){
					returnError('Group ID '+req.params.id+' was not found in the database.');
				}else{
					group.save(req.body)
						// then return success message to the UI
						.then(function(){
								res.json(200, {
									"msg" : 'Group '+req.params.id+' successfully updated in database.'
								});
						})
						.catch(function(error) {
    						var errorMsg = new String(error);
    						returnError(errorMsg);
   						});
				}
			});
	})

	// DELETE by ID (DELETE)
	.delete(function(req, res) {
		
		// bind this response to error function
		var returnError = returnErrorFunc(res);

		new Group({'id': req.params.id})
			.fetch()
			.then(function(group) {
				// if group is not returned, then return error
				if(!group){
					returnError('Group ID '+req.params.id+' was not found in the database.');
				}else{
					group.destroy()
					// then return success message to the UI
					.then(function(){
						res.json(200, {
							"msg" : 'Group '+req.params.id+' successfully removed from database.'
						})
					})
					.catch(function(error) {
						var errorMsg = new String(error);
						returnError(errorMsg);
					});
				}
			});
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

