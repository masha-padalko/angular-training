// angular.module('myapp', ['dndLists']);

angular.module('myapp').controller('NotesController',
    function($scope, $http) {
        $scope.data='';
        $scope.date =  new Date();
        $scope.notes = [];
        $scope.hover = function($event){
            $scope.data=$event.clientX;
        }

        var update = function() {
            var params = {params:{section:$scope.activeSection}};
            $http.get("/notes", params)
                .success(function(notes) {
                    $scope.notes = notes;
                });
        };

        update();

        $scope.add = function() {
            var note = {text: $scope.text, date: new Date(), section:$scope.activeSection};
            if (!$scope.text || $scope.text.length==0) return;
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
        var readSections = function() {
            $http.get("/sections")
                .success(function(sections) {
                    $scope.sections = sections;
                    if ($scope.activeSection == null &&
                        $scope.sections.length>0) {
                        $scope.activeSection =
                            $scope.sections[0].title;
                    }
                    update();
                });
        }
        readSections();

        $scope.showSection = function(section) {
            $scope.activeSection = section.title;
            update();
        }

        $scope.writeSections = function() {
            if ($scope.sections && $scope.sections.length>0) {
                $http.post("/sections/replace", $scope.sections);
            }
        };
        $scope.addSection = function() {
            if ($scope.newSection.length==0) return;
            // check for duplicates
            for (var i=0;i<$scope.sections.length;i++) {
                if ($scope.sections[i].title==$scope.newSection) {
                    return;
                }
            }
            var section = {title: $scope.newSection};
            $scope.sections.unshift(section);
            $scope.activeSection = $scope.newSection;
            $scope.newSection = "";
            $scope.writeSections();
            update();
        }
    });

