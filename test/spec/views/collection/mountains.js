(function() {
	'use strict';

	var root = this;

	root.define([
		'views/collection/mountains'
		],
		function( Mountains ) {

			describe('Mountains Collectionview', function () {

				it('should be an instance of Mountains Collectionview', function () {
					var mountains = new Mountains();
					expect( mountains ).to.be.an.instanceof( Mountains );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );