var app = angular.module("socketApp", ["ngRoute"]);
app.controller('MainController', function($scope) {
	$scope.students = [
		{name: 'Mark Waugh', city:'New York'},
		{name: 'Steve Jonathan', city:'London'},
		{name: 'John Marcus', city:'Paris'}
	];
});
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "index.html",
        controller: 'MainController'
    })
    .when("/registration", {
        templateUrl : "Employee-Registration.html",
        controller: 'MainController'
        
    })
    .otherwise({
			redirectTo: '/'
		});
    
});

