var app = angular.module('workflowBuilder', []);

app.directive('helloWorld', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: '<form ng-submit="submit()">' +
                            'Specify:' +
                            '<input type="text" ng-model="seq" name="text" />' +
                            '<input type="submit" id="submit" value="Submit" />' +
                            '<pre>list={{list}}</pre>' +
                        '</form>',
      controller: function ($scope, $element) {
        console.log('new input controller');
        $scope.list = [];
        $scope.seq = 'hello';
        $scope.submit = function() {
            if ($scope.seq) {
              $scope.list.push(this.seq);
              $scope.seq = '';
            }
        };
      }
  };
});



/*var module = angular.module('workflowBuilder', [])
    .directive('test', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            text: '@'
        },
        template: '<p ng-click="add()">{{text}}</p>',
        controller: function ($scope, $element) {
            $scope.add = function () {
                var el = $compile("<test text='n'></test>")($scope);
                $element.parent().append(el);
            };
        }
    };
});*/