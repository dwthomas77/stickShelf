var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');

// set port
app.set('port', 3000);

// knex and bookshelf
var bookshelf = require('bookshelf')(require('knex')({
	client: 'sqlite3',
	connection: {
		filename: "./test.db"
	}
}));

// set on app for submodule reference
app.set('bookshelf', bookshelf);

// require the restful interface router as a module
var restRouter = require('./rest/restRouter');

// JSON data parser
app.use(bodyParser.json());

// REST API
app.use('/rest', restRouter);

// serve static files for all other requests
app.use(express.static('./src'));

// launch application
app.listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});