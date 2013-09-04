(function() {
	'use strict';

	var root = this;

	root.define([
		'models/mountains-all-model'
		],
		function( MountainsAllModel ) {

			describe('MountainsAllModel Model', function () {

				it('should be an instance of MountainsAllModel Model', function () {
					var mountains-all-model = new MountainsAllModel();
					expect( mountains-all-model ).to.be.an.instanceof( MountainsAllModel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );