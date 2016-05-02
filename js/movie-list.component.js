(function() {
   'use strict';
   
   angular.module('psMovies')
   .component("movieList",{
       templateUrl: 'js/movie-list.component.html',
       controllerAs: 'model',
       controller: function () {
           var model = this;
           model.message = "Hello from a component controller!";
           model.changeMessage = function () {
               model.message = "New message!!";
           };
       }
   });
})();