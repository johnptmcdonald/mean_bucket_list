console.log("loading userCtrl.js")

angular.module('userCtrl', ['userService'])

.controller('userController', function(){

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

.controller('userCreateController', function(User){
	var vm = this;

	vm.type = 'create';

	vm.saveUser = function(){
		User.create(vm.userData)
			.success(function(data){
				console.log(data)
				vm.userData = {}
				vm.data = data
			})
	}
})