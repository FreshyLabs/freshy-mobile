(function() {
	'use strict';

	var root = this;

	root.define([
		'models/mtn'
		],
		function( Mtn ) {

			describe('Mtn Model', function () {

				it('should be an instance of Mtn Model', function () {
					var mtn = new Mtn();
					expect( mtn ).to.be.an.instanceof( Mtn );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );