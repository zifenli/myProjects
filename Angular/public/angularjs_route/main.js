myApp.controller('RouteListCtl',function($scope,remoteData,validate,userService) {
	$scope.isvalidate=validate();
	$scope.persons=userService.getUser();

	$scope.mytext="tttttt";
	$scope.mydata={
		name:'lizifen',
		sex:'女'
	}
	$scope.myFn=function(name){
		alert(name);
	}
	 if($scope.isvalidate){
	 	$scope.name=remoteData.value;
	 }
});
myApp.controller('RouteDetailCtl',function($scope, $routeParams) {
    $scope.id = $routeParams.id;
});
