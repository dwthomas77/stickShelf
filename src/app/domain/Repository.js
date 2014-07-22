/*jshint devel:true */

define(
    [
        'app/domain/GroupCollection'
    ],
    function(GroupCollection) {
        'use strict';

        var _groups = new GroupCollection();
        _groups.fetch({reset: true});

        var _repository = _repository ||  {

            getGroups: function() {
                return _groups; 
            },

        };

        return _repository;
    }
);