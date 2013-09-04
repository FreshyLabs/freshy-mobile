(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/mountains-all-collection'
		],
		function( MountainsAllCollection ) {

			describe('MountainsAllCollection Collection', function () {

				it('should be an instance of MountainsAllCollection Collection', function () {
					var mountains-all-collection = new MountainsAllCollection();
					expect( mountains-all-collection ).to.be.an.instanceof( MountainsAllCollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );