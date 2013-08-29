(function() {
	'use strict';

	var root = this;

	root.define([
		'models/mountain'
		],
		function( Mountain ) {

			describe('Mountain Model', function () {

				it('should be an instance of Mountain Model', function () {
					var mountain = new Mountain();
					expect( mountain ).to.be.an.instanceof( Mountain );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );