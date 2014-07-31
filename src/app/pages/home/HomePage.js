define(
[
    'MessageBus',
    'BaseView',
    'app/domain/Repository',
    'app/widgets/listItemView/ListItemView',
    'app/widgets/groupDetailView/GroupDetailView',
    'app/widgets/userDetailView/UserDetailView',
    'app/widgets/documentDetailView/DocumentDetailView',
    'text!app/pages/home/HomeTemplate.html'
],

function(MessageBus, BaseView, Repository, ListItemView, GroupDetailView, UserDetailView, DocumentDetailView, homeTemplate) {

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
            // track current models being shown
            this.curModel = 'Group';

            // set and listen to collections
            this.groups = Repository.getGroups();
            this.groups.on('reset add remove sync', _.bind(this.addGroups, this));

            this.users = Repository.getUsers();
            this.users.on('reset add remove sync', _.bind(this.addUsers, this));

            this.documents = Repository.getDocuments();
            this.documents.on('reset add remove sync', _.bind(this.addDocuments, this));

            // MessageBus listeners
            this.listenTo( MessageBus, 'updateAlert', this.updateAlert );
            this.listenTo( MessageBus, 'fetchGroups', this.fetchGroups );
            this.listenTo( MessageBus, 'fetchUsers', this.fetchUsers );
            this.listenTo( MessageBus, 'fetchDocuments', this.fetchDocuments );
        },

        // After the DOM element is rendered, create our child widgets
        postRender: function() {
            this.addGroups();
            this.addUsers();
            this.addDocuments();

            // Collapsible List-eners
            this.$('.panel-collapse').on('show.bs.collapse', _.bind(function (e) {
                if(e.currentTarget.id.indexOf("Groups") !== -1){
                    this.activateList('.panel-groups');
                }else if(e.currentTarget.id.indexOf("Users") !== -1){
                    this.activateList('.panel-users');
                }else if(e.currentTarget.id.indexOf("Documents") !== -1){
                    this.activateList('.panel-documents');
                }
            }, this));
            this.$('.panel-collapse').on('shown.bs.collapse', _.bind(function (e) {
                if(e.currentTarget.id.indexOf("Groups") !== -1){
                    this.curModel = 'Group';
                    this.addGroups();
                }else if(e.currentTarget.id.indexOf("Users") !== -1){
                    this.curModel = 'User';
                    this.addUsers();
                }else if(e.currentTarget.id.indexOf("Documents") !== -1){
                    this.curModel = 'Document';
                    this.addDocuments();
                }
            }, this));
        },

        activateList: function(selector){
            this.$('#collapsibleLists .panel').removeClass('panel-primary').addClass('panel-default');
            this.$(selector).addClass('panel-primary');
        },

        updateAlert: function(msg) {
            this.alertBoxElement.removeClass('alert-danger alert-info alert-success hidden')
                .addClass(msg.class + ' show');
            var status = (msg.class === 'alert-danger') ? 'Error: ' : 'Success: ';
            this.alertBoxElement.html('<strong>'+status+'</strong>' + msg.text);
        },

        addGroups: function() {

            // clear only group lists
            _.each(this.children, function(view, key) {
                if(key.indexOf('groupListItem') !== -1){
                    view.destroy();
                }
            });

            // Add Groups List
            this.groups.each(function(model, index) {
                this.addChild({
                    id: 'groupListItem'+index,
                    viewClass: ListItemView,
                    parentElement: this.$('#collapseGroups'),
                    options: {
                        model: model
                    }
                });
            }, this);

            // If Groups is the current chosen model then build detail panels
            if(this.curModel === 'Group'){

                // clear all Detail Views
                this.clearDetailViews();

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
    
            }

        },

        addUsers: function() {

            // clear only group lists
            _.each(this.children, function(view, key) {
                if(key.indexOf('userListItem') !== -1){
                    view.destroy();
                }
            });

            // Add Users List
            this.users.each(function(model, index) {
                this.addChild({
                    id: 'userListItem'+index,
                    viewClass: ListItemView,
                    parentElement: this.$('#collapseUsers'),
                    options: {
                        model: model,
                        type: 'user'
                    }
                });
            }, this);

            // If Users is the current chosen model then build detail panels
            if(this.curModel === 'User'){

                // clear all Detail Views
                this.clearDetailViews();

                // Add new User Detail editable form
                this.addChild({
                    id: 'UserDetailViewNew',
                    viewClass: UserDetailView,
                    parentElement: this.$('#right-col'),
                    options: {
                        selectCollection: this.groups
                    }
                });

                // Add User Detail view for all Groups in collection
                this.users.each(function(user, index) {
                    this.addChild({
                        id: 'UserDetail'+index,
                        viewClass: UserDetailView,
                        parentElement: this.$('#right-col'),
                        options: {
                            model: user,
                            selectCollection: this.groups
                        }
                    });
                }, this);
    
            }

        },

        addDocuments: function() {

            // clear only document lists
            _.each(this.children, function(view, key) {
                if(key.indexOf('documentListItem') !== -1){
                    view.destroy();
                }
            });

            // Add Documents List
            this.documents.each(function(model, index) {
                this.addChild({
                    id: 'documentListItem'+index,
                    viewClass: ListItemView,
                    parentElement: this.$('#collapseDocuments'),
                    options: {
                        model: model,
                        type: 'document'
                    }
                });
            }, this);

            // If Users is the current chosen model then build detail panels
            if(this.curModel === 'Document'){

                // clear all Detail Views
                this.clearDetailViews();

                // Add new User Detail editable form
                this.addChild({
                    id: 'DocumentDetailViewNew',
                    viewClass: DocumentDetailView,
                    parentElement: this.$('#right-col'),
                    options: {
                        selectCollection: this.users
                    }
                });

                // Add User Detail view for all Groups in collection
                this.documents.each(function(user, index) {
                    this.addChild({
                        id: 'DocumentDetail'+index,
                        viewClass: DocumentDetailView,
                        parentElement: this.$('#right-col'),
                        options: {
                            model: user,
                            selectCollection: this.users
                        }
                    });
                }, this);
            }

        },

        fetchGroups: function(){
            this.groups.fetch();
        },

        fetchUsers: function(){
            this.users.fetch();
        },

        fetchDocuments: function(){
            this.documents.fetch();
        },

        clearDetailViews: function() {
            // clear detail views
            _.each(this.children, function(view, key) {
                if(key.indexOf('Detail') !== -1){
                    view.destroy();
                }
            });
        }
    });

}

);