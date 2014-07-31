/*jshint devel:true */

define(
    [
        'app/domain/GroupCollection',
        'app/domain/UserCollection',
        'app/domain/DocumentCollection'
    ],
    function(GroupCollection, UserCollection, DocumentCollection) {
        'use strict';

        // Groups
        var _groups = new GroupCollection();
        _groups.fetch({reset: true});

        // Users
        var _users = new UserCollection();
        _users.fetch({reset: true});

        // Documents
        var _documents = new DocumentCollection();
        _documents.fetch({reset: true});

        var _repository = _repository ||  {

            getGroups: function() {
                return _groups; 
            },

            getUsers: function() {
                return _users; 
            },

            getDocuments: function() {
                return _documents; 
            }

        };

        return _repository;
    }
);