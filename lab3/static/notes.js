angular.module('myapp', []);

angular.module('myapp').controller('NotesController',
    function($scope, $http) {
        $scope.checked=false;
        $scope.data='';
        $scope.notes = [];
        $scope.hover = function($event){
            $scope.data=$event.clientX;
        }
        var update = function() {
            $http.get("/notes")
                .success(function(notes) {
                    $scope.notes = notes;
                });
        };
        update();
    });

