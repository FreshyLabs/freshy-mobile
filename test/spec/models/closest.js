(function() {
	'use strict';

	var root = this;

	root.define([
		'models/closest'
		],
		function( Closest ) {

			describe('Closest Model', function () {

				it('should be an instance of Closest Model', function () {
					var closest = new Closest();
					expect( closest ).to.be.an.instanceof( Closest );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );