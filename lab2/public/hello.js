
angular.module("myapp", [])
    .controller("HelloController", function($scope, $http, $interval) {
        $scope.greeting = "";
        $scope.update = function() {
            if ($scope.name) {
                $http.get("/greeting",
                    {params:
                        {name: $scope.name}
                    })
                    .success(function(res) {
                        $scope.greeting = res;
                    });
            }
        }
        // $interval($scope.update, 200);
    });