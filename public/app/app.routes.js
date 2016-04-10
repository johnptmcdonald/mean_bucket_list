console.log("loading app.routes")
angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when('/', {
			templateUrl: 'app/views/pages/home.html',
			controller: 'mainController',
			controllerAs: 'main'
		})
		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'mainController',
			controllerAs: 'login'
		})
		// .when('/users', {
		// 	templateUrl: 'app/views/pages/users/all.html',
		// 	controller: 'userController',
		// 	controllerAs: 'user'
		// })
		// .when('/users/create', {
		// 	templateUrl: 'app/views/pages/users/single.html',
		// 	controller: 'userCreateController',
		// 	controllerAs: 'user'
		// })
		// .when('/users/:user_id', {
		// 	templateUrl: 'app/views/pages/users/single.html',
		// 	controller: 'userEditController',
		// 	controllerAs: 'user'
		// })

	$locationProvider.html5Mode(true)
})