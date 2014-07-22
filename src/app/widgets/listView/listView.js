define(
[
    'MessageBus',
    'BaseView',
    'app/widgets/listItemView/ListItemView',
    'text!app/widgets/listView/ListViewTemplate.html'
],

function(MessageBus, BaseView, ListItemView, tmpl) {

	'use strict';

    // The base view for this module (extends from /libs/js/superview.js)
    return BaseView.extend({

        tagName: 'div',

        className: 'list-view panel panel-default',

        // Use the template passed in from the define
        template: {
            name: 'ListViewTemplate',
            source: tmpl
        },

        elements: [],

        // After the DOM element is rendered, create our child widgets
        postRender: function() {
            this.collection.each(function(model) {
                this.addChild({
                    name: 'ListItemView',
                    viewClass: ListItemView,
                    parentElement: this.$el.find('.list-group'),
                    options: {model: model}
                });
            }, this);
        }

    });

}

);