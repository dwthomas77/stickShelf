define(
[
    'MessageBus',
    'BaseView',
    'text!app/widgets/listView/ListViewTemplate.html'
],

function(MessageBus, BaseView, tmpl) {

	'use strict';

    // The base view for this module (extends from /libs/js/superview.js)
    return BaseView.extend({

        tagName: 'section',

        className: 'list-vew panel panel-default',

        // Use the template passed in from the define
        template: {
            name: 'ListViewTemplate',
            source: tmpl
        },

        elements: [],

        // After the DOM element is rendered, create our child widgets
        postRender: function() {

            this.addChildren([
                // Example: 
                // {
                //     name: 'MainMenu',
                //     viewClass: MainMenuWidget,
                //     parentElement: this.mainmenuElement
                //}
            ]);

        }

    });

}

);