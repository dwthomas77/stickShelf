// express + app + bookshelf
var express = require('express');
var app = require( process.cwd() + '/server/server');
var bookshelf = app.get('bookshelf');

// lodash for binding and stuff
var _ = require('lodash');

// User model
var User = require('./models/UserModel');

// declare the router
var router = express.Router();

// USERS API (/rest/users)
router.route('/')

	// Fetch All Users (GET)
	.get(function(req, res) {
	
		// bind this response for error handling
		var returnError = returnErrorFunc(res);

		User.collection().fetch({
				withRelated: ['group']
			})
			.then(function(collection) {
				res.json(collection.toJSON());
			});

	})

	// Add new User (POST)
	.post(function(req, res) {
		
		// bind this response to error function
		var returnError = returnErrorFunc(res);

		// confirm body of request
		if(!req.body){
			returnError('Required parameters for new User were not provided.');
		}else{
			// build model from payload
			var user = new User(req.body);
			// validate model
			var validationError = user.validate();
			if(validationError) {
				returnError(validationError);
			}else{
				user.save().then(function(model) {
					res.json(200, {
						"msg" : "User Model ID " + model.get('id') +  " Successfully Added"
					})
				});
			}
		}

	});


// USER API (/rest/users/:id)
router.route('/:id')

	// Fetch by ID (GET)
	.get(function(req, res) {

		// bind this response to error function
		var returnError = returnErrorFunc(res);

		new User({'id': req.params.id})
			.fetch({
				withRelated: ['group']
			})
			.then(function(user) {
				// if user is not returned, then return error
				if(!user){
					returnError('User ID '+req.params.id+' was not found in the database.');
				}else{
					res.json(200, user.toJSON());
				}
			});
	})

	// Update by ID (PUT)
	.put(function(req, res) {

		// bind this response to error function
		var returnError = returnErrorFunc(res);

		new User({'id': req.params.id})
			.fetch({
				withRelated: ['group']
			})
			.then(function(user) {
				// if user is not returned, then return error
				if(!user){
					returnError('User ID '+req.params.id+' was not found in the database.');
				}else{
					user.save(req.body)
						// then return success message to the UI
						.then(function(){
								res.json(200, {
									"msg" : 'User '+req.params.id+' successfully updated in database.'
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

		new User({'id': req.params.id})
			.fetch()
			.then(function(user) {
				// if user is not returned, then return error
				if(!user){
					returnError('User ID '+req.params.id+' was not found in the database.');
				}else{
					user.destroy()
					// then return success message to the UI
					.then(function(){
						res.json(200, {
							"msg" : 'User '+req.params.id+' successfully removed from database.'
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

