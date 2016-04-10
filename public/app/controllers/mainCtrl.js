console.log("loading mainCtrl.js")
angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $scope, $location, Auth){
	console.log("booting mainController")
	// $scope.vm = vm
	var vm = this;
	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function(){
		Auth.getUser()
			.then(function(data){
				vm.user = data.data
			})
	})

	$scope.$on('AUTH:login', function(event, data){
		console.log("$scope on login event triggered", event)
		Auth.getUser()
			.then(function(data){
				console.log(data)
				vm.loggedIn = true
				vm.user = data.data
				$location.path('/')
			})
	})
	$scope.$on('AUTH:logout', function(event, data){
		console.log("$scope on login event triggered", event)
		vm.user = {}
		vm.loggedIn = false
	})

	// vm.doLogin = function(){
	// 	console.log("running do login")
	// 	Auth.login(vm.loginData.username, vm.loginData.password)
	// }

	vm.doLogout = function(){
		console.log("running doLogout")
		Auth.logout();
		$location.path('/login')
	}
})