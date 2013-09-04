(function() {
	'use strict';

	var root = this;

	root.define([
		'views/collection/mountain-collection-view'
		],
		function( MountainCollectionView ) {

			describe('MountainCollectionView Collectionview', function () {

				it('should be an instance of MountainCollectionView Collectionview', function () {
					var mountain-collection-view = new MountainCollectionView();
					expect( mountain-collection-view ).to.be.an.instanceof( MountainCollectionView );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );