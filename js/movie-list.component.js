(function() {
   'use strict';
   
   angular.module('psMovies')
   .component("movieList",{
       templateUrl: 'js/movie-list.component.html',
       controllerAs: 'model',
       controller: ['$http',controller]
   });
   
   function controller($http) {
       var model = this;
       model.message = "Hello from a component controller!";
       model.movies = [];
       
       model.$onInit = function () {
            fetchMovies($http).then(function(movies) {
                model.movies = movies;
            }); 
       };
       
       model.changeMessage = function () {
           model.message = "New message!!";
       };
   }
   
   function fetchMovies($http) {
       return $http.get("/movies.json")
        .then(function(response) {
            return response.data;
        });
   }
   
})();