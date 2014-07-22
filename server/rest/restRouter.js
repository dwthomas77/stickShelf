
// require the /groups router
var groups = require('./groups');

// router
var router = require('express').Router();

// groups module
router.use('/groups', groups);

router.use('/', function(req, res) {
    res.send('Welcome to the RESTful API');
});

// export the router
module.exports = router;