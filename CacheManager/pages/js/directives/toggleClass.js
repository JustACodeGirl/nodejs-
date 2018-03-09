/**
 * Created by deqin.zhu on 2016/7/9.
 */
angular.module('app')
    .directive('twToggle1', function () {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope) {
                scope.$node = {
                    folded: false,
                    toggle: function () {
                        this.folded = !this.folded;
                    }
                };
            }
        };
    })
    .directive('twToggle', function () {
        return {
            restrict: 'A',
            scope: true,
            controller: function ($scope) {
                $scope.folded = false;
                $scope.toggle = function () {
                    $scope.folded = !$scope.folded;
                }
            }
        };
    })