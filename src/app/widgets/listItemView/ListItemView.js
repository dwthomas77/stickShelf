define(
[
    'MessageBus',
    'BaseView',
    'text!app/widgets/listItemView/ListItemViewTemplate.html'
],

function(MessageBus, BaseView, tmpl) {

	'use strict';

    return BaseView.extend({

        tagName: 'li',

        className: 'list-group-item',

        // Use the template passed in from the define
        template: {
            name: 'ListItemViewTemplate',
            source: tmpl
        },

        elements: [],

        bindings: {
            '.js-li-name': 'name',
        },

        initialize: function() {

        },

        postRender: function() {
            this.stickit();
        }

    });

}

);