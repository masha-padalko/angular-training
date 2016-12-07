angular.module('myapp', []);

angular.module('myapp').controller('NotesController',
    function($scope, $http) {
        $scope.data='';
        $scope.date =  new Date();
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

        $scope.add = function() {
            var note = {text: $scope.text, date: new Date()};

            $http.post("/notes", note)
                .success(function() {
                    $scope.text = "";
                    update();
                });

        };
        $scope.remove = function(id) {
            $http.delete("/notes",{params:{id:id}})
                .success(function(res) {
                    update();
                });
        }

        // $scope.totop = function(id) {
        //     $http.delete("/totop",{params:{id:id}})
        //         .success(function(res) {
        //             update();
        //         });
        // }


    });

