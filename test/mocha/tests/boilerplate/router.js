define(function(require) {

  var Backbone = require("backbone");
  var Router = require("router");

  // Test that the Router exists.
  describe("Router", function() {
    it("should exist", function() {
      expect(Router).to.exist;
      expect(new Router()).to.be.an.instanceof(Backbone.Router);
    });
  });

});