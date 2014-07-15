var express = require('express');
var app = require('../server');

// bookshelf
var bookshelf = app.get('bookshelf');

module.exports = (function() {
    'use strict';
    var router = express.Router();

    // set error message string to return an error
    var err = {};

    // Define Group Model
	var Group = bookshelf.Model.extend({
		tableName: 'groups'
	});

    router.get('/', function(req, res) {

    	// query for all groups
    	// Build Group Collection
		Group.collection().fetch().then(function(collection) {
	  		// return an error
			if(collection.isEmpty()){
			//	err.str = 'No Group objects found in database';
			//}
			// or add a new default group to return a valid result
				Group.forge({
					name: 'Default Group'
				}).save().then(function() {
		  			Group.collection().fetch().then(function(collection) {
		  				res.json(collection.toJSON());
		  			}); 
				});
			}else{
				res.json(collection.toJSON());
			}
	});


    	// if(err.str){
    	// 	res.json({
    	// 		"error" : {
    	// 			"msg" : err.str
    	// 		}
    	// 	});
    	// }else{


    	// 	console.log(Group.collection());
    	// }

	});

    return router;
})();