define(
[
    'MessageBus',
    'BaseView',
    'text!app/pages/home/HomeTemplate.html'
],

function(MessageBus, BaseView, homeTemplate) {

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