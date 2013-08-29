(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/mountainsview'
		],
		function( Mountainsview ) {

			describe('Mountainsview Compositeview', function () {

				it('should be an instance of Mountainsview Compositeview', function () {
					var mountainsview = new Mountainsview();
					expect( mountainsview ).to.be.an.instanceof( Mountainsview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );