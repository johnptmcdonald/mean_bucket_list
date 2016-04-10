console.log("loading mainCtrl.js")
angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $scope, $location, Auth){

	var vm = this;
	console.log('running auth.isLoggedIn')
	vm.loggedIn = Auth.isLoggedIn()
	console.log(vm.loggedIn)

	$rootScope.$on('$routeChangeStart', function(){
		vm.loggedIn = Auth.isLoggedIn();
		Auth.getUser()
			.then(function(data){
				vm.user = data.data
			})


	})

	$scope.$on('AUTH:login', function(event, data){
		console.log("$scope on login event triggered", event, data)
		
		Auth.getUser()
			.then(function(data){
				console.log("running Auth.getUser")
				vm.loggedIn = true
				vm.user = data.data
				$location.path('/')
			})

	})

	vm.doLogin = function(){
		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data){
				vm.error = ''

				console.log("about to get user")
				Auth.getUser()
					.then(function(data){
						console.log("got user:" + data)
						vm.user = data.data
						$location.path('/');
					})

				if(data.success){
					// $location.path('/');
				}
				else {
					vm.error = data.message
				}
				
			})
	}

	vm.doLogout = function(){
		console.log("running doLogout")
		Auth.logout();
		$location.path('/login')
	}
})