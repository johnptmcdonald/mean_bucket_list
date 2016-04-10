console.log("loading userCtrl.js")

angular.module('userCtrl', ['userService'])

.controller('userController', function($scope){

	var vm = this;

	User.all()
		.success(function(data){
			vm.users = data
		})


	vm.deleteUser = function(id){
		User.delete(id)
			.success(function(){
				User.all()
					.success(function(data){
						vm.users = data;
					})
			})
	}
})

.controller('userCreateController', function($scope, User, $location, Auth){
	var vm = this;

	vm.type = 'create';

	vm.saveUser = function(){
		User.create(vm.userData)
			.success(function(data){
				Auth.login(vm.userData.username, vm.userData.password)
			})	
	}
})

.controller('userEditController', function($routeParams, User){
	var vm = this;

	vm.type = 'edit';
	console.log($routeParams.user_id)
	User.get($routeParams.user_id)
		.success(function(data){
			vm.userData = data
			console.log(vm.userData)
		})


	vm.saveUser = function(){
		vm.processing = true;
		User.update($routeParams.user_id, vm.userData)
			.success(function(data){
				vm.processing = false;
				vm.userData = {}
				vm.data = data
			})
	}
})

.controller('userLoginController', function(Auth){
	var vm = this;


	vm.doLogin = function(){
		console.log("running do login")
		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data){
				if(data.success === false){
					vm.error = data.message
				}
			})
	}
})
