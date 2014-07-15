var express = require('express');
var app = require('../server');

// require the 'groups' restful interface service
var groups = require('./groups');

module.exports = (function() {
    'use strict';

    // router
    var router = express.Router();

	// groups module
	router.use('/groups', groups);

    router.use('/', function(req, res) {
        res.send('Welcome to the RESTful API');
    });

    return router;
})();