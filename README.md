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