> Components are the best way to program with angular.

When we use components we stop using *directives* and *controllers*. Components are kind of controllers with the directive power.

## Component Example

### Including the files

```html
<script src="/node_modules/angular/angular.js"></script>
<script src="/js/psMovies.js"></script>
<script src="/js/movie-list.component.js"></script>
```

### Calling the Component

```html
<div class="container">
    
    <movie-list></movie-list>
        
</div>
```

### Component Template

```html
<div>
    <h3>{{model.message}}</h3>
    <!-- by default is $ctrl.message, but I've changed it to model in the controllerAs section -->
    <input type="text" ng-model="model.message" class="form-control">
    <button ng-click="model.changeMessage()" class="btn btn-default">
        Change Message
    </button>
</div>
```

### Component Code

```js
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
```

### Component Controllers

New Lifecycle Hooks

- $onInit
- $onDestroy
- $onChanges
- $postLink // DOM manipulation

#### Using $http and $onInit

```js
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
```

### Components vs Directives

Directives are more powerful than components, but components cover "95%" of the cases.

Components define a better API and better defaults.

Components are always custom elements with an isolated scope.


### Example: a rating component

In this example there are:

- bindings
- transclusion

```js
(function() {
    'use strict';
    
    angular.module('psMovies')
    .component('movieRating', {
        templateUrl: 'js/movie-rating.component.html',
        bindings: {
            rating: "<" // rating is the name that the consumer has to use   
        },
        transclude: true, // transclusion
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
        
        function $onChanges() { // we update the value
            $onInit();
        }
    }
})();
```

```html
<span ng-repeat="entry in model.entries track by $index">
    <ng-transclude>
        *
    </ng-transclude>
</span>
```