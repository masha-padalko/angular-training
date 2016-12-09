module.controller("UserFormController", function($scope, $http, $location)
{
    $scope.user = {};
    $scope.submitForm = function() {
        $http.post("/users", $scope.user)
            .success(function(data) {
                console.log("saved!");
                $location.path("/thankspage");
            });
    }

    // var viewUsers = function() {
    //     var params = {params:{user:$scope.userName}};
    //     $http.get("/users", params)
    //         .success(function(users) {
    //             $scope.users = users;
    //         });
    // };
    // viewUsers();
});



module.directive("matchTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherValue: "=matchTo"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.matchTo = function(modelValue) {
                console.log();
                return modelValue == scope.otherValue;};
            scope.$watch("otherValue", function() {
                ngModel.$validate();
            });
        }
    };
});

module.directive('uniqueUser', function($http, $timeout) {
    var timer;
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {

            scope.$watch(attr.ngModel, function(value) {
                if (timer) $timeout.cancel(timer);
                timer = $timeout(function(){
                    if (value !== undefined) {
                        $http.get('/checkUser?user='+value)
                            .success(function(result) {
                                ctrl.$setValidity('unique', result);
                            });
                    }

                }, 200);
            })
        }
    }
});

// module.directive('uniqueUserAge', function($http, $timeout) {
//     var timer;
//     return {
//         restrict: 'A',
//         require: 'ngModel',
//         link: function(scope, elem, attr, ctrl) {
//
//             scope.$watch(attr.ngModel, function(value) {
//                 if (timer) $timeout.cancel(timer);
//                 timer = $timeout(function(){
//                     if (value !== undefined) {
//                         $http.get('/checkUser?age='+value)
//                             .success(function(result) {
//                                 ctrl.$setValidity('older12', result);
//                             });
//                     }
//
//                 }, 200);
//             })
//         }
//     }
// });

// Alternate directive to check user for uniqness may be looking
// this way. It uses $asyncValidators and $q service to return
// asynchronous validation result.

// module.directive('uniqueUser', function($http, $q) {
//     var timer;
//     return {
//         restrict: 'A',
//         require: 'ngModel',
//         link: function(scope, elem, attr, ngModel) {
//             ngModel.$asyncValidators.unique =
//                 function(modelValue, viewValue) {
//                     var value = modelValue || viewValue;
//                     return $http.get('/checkUser?user=' + value).
//                     then(function(response) {
//                         if (!response.data) {
//                             return $q.reject();
//                         }
//                         return true;
//                     });
//                 };
//         }
//     }
// });