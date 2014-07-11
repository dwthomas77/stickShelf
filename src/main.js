(function(require) {

    'use strict';

    // Kick off the application by requiring in the app and starting it
    require([

        'app/app',
        'bootstrap'

    ],

    function(app) {

        app.start();

    });

}(require));