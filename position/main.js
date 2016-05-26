/**
 * Created by lizifen on 16/3/22.
 */
(function (angular) {
    angular.module('positionApp', ['ui.bootstrap.position'])
        .controller('positionCtrl', ['$scope', function ($scope) {
        }])
        .directive('position', ['elePosition', '$timeout',function (elePosition,$timeout) {
            return {
                restrict: 'EA',
                replace: true,
                templateUrl: '/position.html',
                scope: {
                    title: "@"
                },
                link: function (scope, elm, iAttrs) {
                    $timeout(function(){
                        scope.data = elePosition.position(elm);
                    },3000);


                }
            };
        }])
        .factory('elePosition', ['$document','$window', function ($document,$window) {
            return {
                position: function (elem) {
                    elem = elem.nodeName ? elem : elem[0] || elem;
                    var elemOffset = elem.getBoundingClientRect();

                    var offsetParent = elem.offsetParent || $document[0].documentElement;
                    var parentOffset = {top: 0, left: 0};

                    function isStaticPositioned(el) {
                        return ($window.getComputedStyle(el).position || 'static') === 'static';
                    }

                    while (offsetParent && (offsetParent !== $document[0].documentElement) && isStaticPositioned(offsetParent)) {
                        offsetParent = offsetParent.offsetParent;
                    }

                    offsetParent = offsetParent || $document[0].documentElement;

                    if (offsetParent !== $document[0].documentElement) {
                        parentOffset = offsetParent.getBoundingClientRect();
                        //debugger;
                        parentOffset.top += (offsetParent.clientTop - offsetParent.scrollTop);
                        parentOffset.left += (offsetParent.clientLeft - offsetParent.scrollLeft);
                    }
                    console.log(parentOffset);
                    console.log(elemOffset);

                    return {
                        width: Math.round(angular.isNumber(elemOffset.width) ? elemOffset.width : elem.offsetWidth),
                        height: Math.round(angular.isNumber(elemOffset.height) ? elemOffset.height : elem.offsetHeight),
                        top: Math.round(elemOffset.top - parentOffset.top),
                        left: Math.round(elemOffset.left - parentOffset.left)
                    }
                }
            }
        }]);
}(angular));
