(function() {
	'use strict';

	var root = this;

	root.define([
		'controllers/mtn'
		],
		function( Mtn ) {

			describe('Mtn Controller', function () {

				it('should be an instance of Mtn Controller', function () {
					var mtn = new Mtn();
					expect( mtn ).to.be.an.instanceof( Mtn );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );