angular.module('myapp', []);

angular.module('myapp').controller('NotesController',
    function($scope) {
    $scope.checked=true;
        $scope.notes = [{name: "first", text: "bla bla"}, {name: "second",text: "bla bla 2"} ];
    });