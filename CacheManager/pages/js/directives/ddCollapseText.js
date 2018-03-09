/**
 * Created by deqin.zhu on 2016/6/12.
 */
angular.module('app')
    .directive('ddCollapseText', ['$compile', function($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function($scope, $element, $attrs) {
                $scope.collapsed = false;
                $attrs.$observe('ddCollapseText', function(maxLength) {
                    var text = $element[0].innerText;
                    if(text.length > maxLength) {
                        var firstPart = String(text).substring(0, maxLength);
                        $scope.secondPart = String(text).substring(maxLength, text.length);
                        var firstSpan = $compile('<span>' + firstPart + '...' + '</span>')($scope);
                        $element.empty();
                        $element.append(firstSpan);
                    }
                })
            }
        }
    }]);

