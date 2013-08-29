(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/mountains'
		],
		function( Mountains ) {

			describe('Mountains Collection', function () {

				it('should be an instance of Mountains Collection', function () {
					var mountains = new Mountains();
					expect( mountains ).to.be.an.instanceof( Mountains );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );