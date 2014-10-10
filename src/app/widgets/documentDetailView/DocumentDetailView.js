define(
[
    'MessageBus',
    'BaseView',
    'app/domain/DocumentModel',
    'text!app/widgets/documentDetailView/DocumentDetailEditTemplate.html',
    'text!app/widgets/documentDetailView/DocumentDetailROTemplate.html'
],

function(MessageBus, BaseView, DocumentModel, editTmpl, roTmpl) {

	'use strict';

	return BaseView.extend({

		tagName: 'div',

        className: 'panel panel-default document-detail-view',

        elements: ['save', 'edit', 'delete'],

        events: {
        	'click .js-save': 'saveDocument',
            'click .js-edit': 'editDocument',
            'click .js-delete': 'deleteDocument'
        },

        bindings: {
                '.js-documentId' : 'id',
                '.js-title' : 'title',
                '.js-body' : 'body',
                '.js-updated' : 'updated_at',
                '.js-created' : 'created_at',
                '.js-user': {
                    observe: 'user_id',
                    selectOptions: {
                        collection: function() {
                            this.selectCollection.each(function(user) {
                                var full_name = user.get('first_name') + ' ' + user.get('last_name');
                                user.set('full_name', full_name);
                            });
                            return this.selectCollection;
                        },
                        defaultOption: {
                            label: 'Select User',
                            value: null
                        },
                        labelPath: 'full_name',
                        valuePath: 'id'
                    },
                },
                '.js-userName': {
                    observe: 'user_id',
                    onGet: 'formatUserName'
                }
        },

        initialize: function(options) {
            this.model = this.model || new DocumentModel();
            this.model.on('invalid', this.validationError);

            this.selectCollection = options.selectCollection;

            this.model.set('users',
                this.options.selectCollection.isEmpty() ? [] : this.options.selectCollection.toJSON()
            );

        },

        // override the render funtion to add dynamic templates
        render: function() {
        	// support for either Read Only (RO) or Editable Display templates
            if(this.model.isNew() || this.edit){
                this.template = {
                    name: 'DocumentDetailEdit',
                    source: editTmpl
                };
            }else{
                this.template = {
                    name: 'DocumentDetailDisplay',
                    source: roTmpl
                };
            }

        	// then call original render function
        	BaseView.prototype.render.call(this);
        },

        postRender: function() {
            this.stickit();
        },

        saveDocument: function(event) {
            // clean and save model
            this.model.clean().save({}, {
                success: this.successMsg,
                error: this.errorMsg
            });
            this.edit = false;
        },

        editDocument: function(event) {
            this.edit = true;
            this.render();
        },

        deleteDocument: function(event) {
            this.model.destroy({
                wait: true,
                success: this.successMsg
            });
        },

        validationError: function(model){
            MessageBus.trigger('updateAlert', {
                class: 'alert-danger',
                text: model.validationError
            });
        },

        successMsg: function(model, response){
            MessageBus.trigger('updateAlert', {
                class: 'alert-success',
                text: response.msg
            });
            MessageBus.trigger('fetchDocuments');
        },

        errorMsg: function(model, response, options) {
            if(response.responseText){
                response = JSON.parse(response.responseText);
            }
            MessageBus.trigger('updateAlert', {
                class: 'alert-danger',
                text: response.error.msg
            });
        },

        formatUserName: function(value, options) {            
            // Group is not required and may not have a value
            if(!_.isEmpty(options.view.model.get('user'))){
                var first = options.view.model.get('user').first_name;
                var last = options.view.model.get('user').last_name;
                return first + ' ' + last;
            }
        }

	});


});