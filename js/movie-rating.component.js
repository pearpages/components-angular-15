(function() {
    'use strict';
    
    angular.module('psMovies')
    .component('movieRating', {
        templateUrl: 'js/movie-rating.component.html',
        bindings: {
            rating: "<" // rating is the name that the consumer has to use   
        },
        transclude: true,
        controller: controller,
        controllerAs: "model"
    });
    
    function controller() {
        var model = this;
        model.entries;
        
        model.$onInit = $onInit;
        model.$onChanges = $onChanges;
        
        function $onInit() {
            model.entries = new Array(model.rating);
        }
        
        function $onChanges() {
            $onInit();
        }
    }
})();