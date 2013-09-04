(function() {
	'use strict';

	var root = this;

	root.define([
		'controllers/mountains-all-controller'
		],
		function( MountainsAllController ) {

			describe('MountainsAllController Controller', function () {

				it('should be an instance of MountainsAllController Controller', function () {
					var mountains-all-controller = new MountainsAllController();
					expect( mountains-all-controller ).to.be.an.instanceof( MountainsAllController );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );