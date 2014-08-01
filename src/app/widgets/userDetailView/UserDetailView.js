define(
[
    'MessageBus',
    'BaseView',
    'app/domain/UserModel',
    'text!app/widgets/userDetailView/UserDetailEditTemplate.html',
    'text!app/widgets/userDetailView/UserDetailROTemplate.html'
],

function(MessageBus, BaseView, UserModel, editTmpl, roTmpl) {

	'use strict';

	return BaseView.extend({

		tagName: 'div',

        className: 'panel panel-default user-detail-view',

        elements: ['save'],

        events: {
        	'click .js-save': 'saveUser',
            'click .js-edit': 'editUser',
            'click .js-delete': 'deleteUser'
        },

        bindings: {
                '.js-userId' : 'id',
                '.js-firstName' : 'first_name',
                '.js-lastName' : 'last_name',
                '.js-email' : 'email',
                '.js-group': {
                    observe: 'group_id',
                    selectOptions: {
                        collection: 'this.selectCollection',
                        labelPath: 'name',
                        valuePath: 'id',
                        defaultOption: {
                            label: 'Select Group',
                            value: null
                        }
                    },
                },
                '.js-groupName': {
                    observe: 'group_id',
                    onGet: 'formatGroupName'
                }
        },

        initialize: function(options) {
            this.model = this.model || new UserModel();
            this.model.on('invalid', this.validationError);

            this.selectCollection = options.selectCollection;

            this.model.set('groups',
                this.options.selectCollection.isEmpty() ? [] : this.options.selectCollection.toJSON()
            );

        },

        // override the render funtion to add dynamic templates
        render: function() {
        	// support for either Read Only (RO) or Editable Display templates
            if(this.model.isNew() || this.edit){
                this.template = {
                    name: 'UserDetailEdit',
                    source: editTmpl
                };
            }else{
                this.template = {
                    name: 'UserDetailDisplay',
                    source: roTmpl
                };
            }

        	// then call original render function
        	BaseView.prototype.render.call(this);
        },

        postRender: function() {
            this.stickit();
        },

        saveUser: function(event) {
            // clean and save model
            this.model.clean().save({}, {
                success: this.successMsg,
                error: this.errorMsg
            });
            this.edit = false;
        },

        editUser: function(event) {
            this.edit = true;
            this.render();
        },

        deleteUser: function(event) {
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
            MessageBus.trigger('fetchUsers');
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

        formatGroupName: function(value, options) {            
            // Group is not required and may not have a value
            if(!_.isEmpty(options.view.model.get('group'))){
                return options.view.model.get('group').name;
            }
        }


	});


});