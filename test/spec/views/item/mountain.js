(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/mountain'
		],
		function( Mountain ) {

			describe('Mountain Itemview', function () {

				it('should be an instance of Mountain Itemview', function () {
					var mountain = new Mountain();
					expect( mountain ).to.be.an.instanceof( Mountain );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );