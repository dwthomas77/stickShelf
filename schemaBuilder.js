var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./test.db"
  }
});

var buildTables = function() {

	// Start with the Groups table
	knex.schema.createTable('groups', function (group) {
		// primary key id
		group.increments('id');
		group.string('name');
	}).then(buildUsersTable);

};

var buildUsersTable = function() {

	// Next add the Users table, which references Groups
	knex.schema.createTable('users', function (user) {
		// primary key id
		user.increments('id');
		user.string('first_name');
		user.string('last_name');
		// emails should be unique
		user.string('email').unique();
		// foreign key references Group id
		user.integer('group_id').unsigned().references('id').inTable('groups');
	}).then(buildDocumentsTable);

};

var buildDocumentsTable = function() {

	// Finally add the Documents table, which references Users
	knex.schema.createTable('documents', function (doc) {
		// primary key id
		doc.increments('id');
		// use created and updated timestamps
		doc.timestamps();
		doc.string('name');
		doc.string('title');
		doc.text('body');
		// foreign key references User id
		doc.integer('user_id').unsigned().references('id').inTable('users');
	}).then(console.log('schema finished building'));

};

// Build the Schema
buildTables();

// Example Schema 
//CREATE TABLE "documents" ("id" integer not null primary key autoincrement, "created_at" datetime, "updated_at" datetime, 
	//"title" varchar(255), "body" text, "user_id" integer, foreign key("user_id") references "users"("id"));
//CREATE TABLE "groups" ("id" integer not null primary key autoincrement, "name" varchar(255));
//CREATE TABLE "users" ("id" integer not null primary key autoincrement, "first_name" varchar(255), "last_name" varchar(255), 
	//"email" varchar(255), "group_id" integer, foreign key("group_id") references "groups"("id"));
//CREATE UNIQUE INDEX users_email_unique on "users" ("email");
