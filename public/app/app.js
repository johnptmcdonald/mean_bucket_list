console.log("loading app.js")

angular.module('meanBucketList', [
	'app.routes',
	'mainCtrl',
	'userCtrl',
	'userService',
	'authService'
])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor')
})