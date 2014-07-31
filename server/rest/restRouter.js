// get REST API modules
var groups = require('./groups');
var users = require('./users');
var documents = require('./documents');

// declare router
var router = require('express').Router();

// init REST API Endpoints
router.use('/groups', groups);
router.use('/users', users);
router.use('/documents', documents);

// return message for all other requests
router.use('/', function(req, res) {
    res.send('Welcome to the StickShelf RESTful API');
});

// export the router
module.exports = router;