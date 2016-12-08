var module = angular.module('myapp', ['dndLists', 'ngRoute']);
module.config(
    function($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'routes/notes/notes.html',
            controller: 'NotesController'
        }).when('/register', {
            templateUrl: 'routes/userForm/userForm.html',
            controller: 'UserFormController'
        })
            .when('/section/:name', {
            templateUrl: 'routes/viewSection/viewSection.html',
            controller: 'ViewSectionController'
        }).otherwise({
            redirectTo: '/'
        });
    }
        );