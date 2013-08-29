(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/MountainView'
		],
		function( Mountainview ) {

			describe('Mountainview Itemview', function () {

				it('should be an instance of Mountainview Itemview', function () {
					var MountainView = new Mountainview();
					expect( MountainView ).to.be.an.instanceof( Mountainview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );