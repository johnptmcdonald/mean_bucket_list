console.log("loading mainCtrl.js")
angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth){

	var vm = this;
	vm.loggedIn = Auth.isLoggedIn()

	$rootScope.$on('$routeChangeStart', function(){
		vm.loggedIn = Auth.isLoggedIn();
		Auth.getUser()
			.then(function(data){
				vm.user = data.data
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
						console.log(vm.user)
						$location.path('/');
					})

				if(data.success){
					$location.path('/');
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