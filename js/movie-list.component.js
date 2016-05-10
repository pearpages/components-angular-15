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
       
       model.$onInit = $onInit;
       model.changeMessage = changeMessage;
       model.upRating = upRating;
       model.downRating = downRating;
       
       function upRating(movie) {
           if(movie.rating < 5){
               movie.rating += 1;
           }
       }
       
       function downRating(movie) {
           if(movie.rating >1){
               movie.rating -= 1;
           }
       }
       
       function $onInit() {
            fetchMovies($http).then(function(movies) {
                model.movies = movies;
            }); 
       };
       
       function changeMessage() {
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