(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/view-name'
		],
		function( ViewName ) {

			describe('ViewName Itemview', function () {

				it('should be an instance of ViewName Itemview', function () {
					var view-name = new ViewName();
					expect( view-name ).to.be.an.instanceof( ViewName );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );