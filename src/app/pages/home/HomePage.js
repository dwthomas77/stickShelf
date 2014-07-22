define(
[
    'MessageBus',
    'BaseView',
    'app/domain/Repository',
    'app/widgets/listView/ListView',
    'app/widgets/groupDetailView/GroupDetailView',
    'text!app/pages/home/HomeTemplate.html'
],

function(MessageBus, BaseView, Repository, ListView, GroupDetailView, homeTemplate) {

    'use strict';

    // The base view for this module (extends from /libs/js/superview.js)
    return BaseView.extend({

        // Make this view a <section> in the DOM
        tagName: 'section',

        // Give it a class of 'page'
        className: 'page',

        // Use the template passed in from the define
        template: {
            name: 'homeTemplate',
            source: homeTemplate
        },

        elements: ['alertBox'],

        initialize: function() {
            // set and listen to collections
            this.groups = Repository.getGroups();
            this.groups.on('reset add remove sync', _.bind(this.addGroups, this));

            this.listenTo( MessageBus, 'updateAlert', this.updateAlert );
            this.listenTo( MessageBus, 'fetchGroups', this.fetchGroups );
        },

        // After the DOM element is rendered, create our child widgets
        postRender: function() {
            this.addGroups();
        },

        updateAlert: function(msg) {
            this.alertBoxElement.removeClass('alert-danger alert-info alert-success')
                .addClass(msg.class);
            var status = (msg.class === 'alert-danger') ? 'Error: ' : 'Success: ';
            this.alertBoxElement.html('<strong>'+status+'</strong>' + msg.text);
        },

        fetchGroups: function() {
            this.groups.fetch();
        },

        addGroups: function() {

            // clear group views
            _.each(this.children, function(view, key) {
                if(key.indexOf('Group') !== -1){
                    view.destroy();
                }
            });

            // Add Groups List
            this.addChild({
                id: 'GroupList',
                viewClass: ListView,
                parentElement: this.$('#accordion'),
                options: {
                    collection: this.groups,
                    model: new Backbone.Model({
                        title: 'Groups',
                        listNum: 'One',
                        openClass: 'in'
                    })
                }
            });

            // Add new Group Detail editable form
            this.addChild({
                id: 'GroupDetailViewNew',
                viewClass: GroupDetailView,
                parentElement: this.$('#right-col')
            });

            // Add Group Detail view for all Groups in collection
            this.groups.each(function(group, index) {
                this.addChild({
                    id: 'GroupDetail'+index,
                    viewClass: GroupDetailView,
                    parentElement: this.$('#right-col'),
                    options: {model: group}
                });
            }, this);

        },

        addUsers: function() {
            this.addChild({
                name: 'UserList',
                viewClass: ListView,
                parentElement: this.$('#accordion'),
                options: {
                    model: new Backbone.Model({
                        title: 'Users',
                        listNum: 'Two',
                        openClass: ''
                    })
                }
            });
        },

        addDocuments: function() {
            this.addChild({
                name: 'DocumentList',
                viewClass: ListView,
                parentElement: this.$('#accordion'),
                options: {
                    model: new Backbone.Model({
                        title: 'Documents',
                        listNum: 'Three',
                        openClass: ''
                    })
                }
            });
        }
    });

}

);