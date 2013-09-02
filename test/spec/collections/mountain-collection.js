(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/mountain-collection'
		],
		function( MountainCollection ) {

			describe('MountainCollection Collection', function () {

				it('should be an instance of MountainCollection Collection', function () {
					var mountain-collection = new MountainCollection();
					expect( mountain-collection ).to.be.an.instanceof( MountainCollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );