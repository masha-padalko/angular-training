angular.module('myapp', []);

angular.module('myapp').controller('NotesController',
    function($scope) {
        $scope.checked=false;
        $scope.data='';
        $scope.notes = [{name: "first", text: "bla bla"}, {name: "second",text: "bla bla 2"} ];
        $scope.hover = function($event){
            $scope.data=$event.clientX;
        }
    });