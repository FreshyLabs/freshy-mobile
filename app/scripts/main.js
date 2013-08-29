require([
	'backbone',
	'application',
  'routers/router',
	'regionManager'
],
function ( Backbone, App, Router ) {
    'use strict';

    App.router = new Router();

    Backbone.history.start({ pushState: true });

	  App.start();
});
