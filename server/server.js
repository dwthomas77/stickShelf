var express = require('express');

var server = express();

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  }
});
var bookshelf = require('bookshelf')(knex);
server.set('bookshelf', bookshelf);



//server.use('/media', express.static(__dirname + '/media'));
console.log(__dirname);
server.use(express.static('./src'));
//console.log('src/');

server.listen(3000);