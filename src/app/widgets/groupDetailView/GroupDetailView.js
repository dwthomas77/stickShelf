define(
[
    'MessageBus',
    'BaseView',
    'app/domain/GroupModel',
    'text!app/widgets/groupDetailView/GroupDetailEditTemplate.html',
    'text!app/widgets/groupDetailView/GroupDetailROTemplate.html'
],

function(MessageBus, BaseView, GroupModel, editTmpl, roTmpl) {

	'use strict';

	return BaseView.extend({

		tagName: 'div',

        className: 'panel panel-default detail-view',

        elements: ['save'],

        events: {
        	'click .js-save': 'saveGroup',
            'click .js-edit': 'editGroup',
            'click .js-delete': 'deleteGroup'
        },

        bindings: {
            '.js-groupId': 'id',
            '.js-groupName': 'name'
            
        },

        initialize: function() {
            this.model = this.model || new GroupModel();
            this.model.on('invalid', this.validationError);

        },


        // override the render funtion to add dynamic templates
        render: function() {
        	// support for either Read Only (RO) or Editable Display templates
            if(this.model.isNew() || this.edit){
                this.template = {
                    name: 'GroupDetailEdit',
                    source: editTmpl
                };
            }else{
                this.template = {
                    name: 'GroupDetailDisplay',
                    source: roTmpl
                };
            }

        	// then call original render function
        	BaseView.prototype.render.call(this);
        },

        postRender: function() {
            this.stickit();
        },

        saveGroup: function(event) {
            // find the value of the name field 
            var name = this.$('#group-name').val();
            this.model.set('name', name);
            // clean model
            _.each(this.model.attributes, function(value, key){
                if(key !== 'id' && key !== 'name'){
                    this.model.unset(key);
                }
            });
            this.model.save({}, {
                success: this.successMsg,
                error: this.errorMsg
            });
            this.edit = false;
        },

        editGroup: function(event) {
            this.edit = true;
            this.render();
        },

        deleteGroup: function(event) {
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
            MessageBus.trigger('fetchGroups');
        },

        errorMsg: function(model, response, options) {
            if(response.responseText){
                response = JSON.parse(response.responseText);
            }
            MessageBus.trigger('updateAlert', {
                class: 'alert-danger',
                text: response.error.msg
            });
        }

	});


});