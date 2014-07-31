define(
[
    'MessageBus',
    'BaseView',
    'text!app/widgets/listItemView/ListItemViewTemplate.html'
],

function(MessageBus, BaseView, tmpl) {

	'use strict';

    return BaseView.extend({

        tagName: 'div',

        className: 'list-group-item',

        // Use the template passed in from the define
        template: {
            name: 'ListItemViewTemplate',
            source: tmpl
        },

        elements: [],

        bindings: {
            
        },

        initialize: function(options) {
            this.type = options.type;
        },

        postRender: function() {
            // Stickit + Dynamic Bindings
            this.stickit();
            // User Name Display
            if(this.type === 'user'){
                this.addBinding(null, '.js-li-name', {
                    observe:'first_name', 
                    onGet: this.showUserName
                });

                this.addBinding(null, '.js-li-name', {
                    observe:'last_name', 
                    onGet: this.showUserName
                });
            // Document Name Display
            }else if(this.type === 'document'){
                this.addBinding(null, '.js-li-name', 'title');
            // Group Name Display
            }else{
                this.addBinding(null, '.js-li-name', 'name');
            }
        },

        showUserName: function(value, options) {
            var first = options.view.model.get('first_name');
            var last = options.view.model.get('last_name');
            return first + ' ' + last;
        }

    });

}

);