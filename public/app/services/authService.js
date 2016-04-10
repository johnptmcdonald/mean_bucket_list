console.log("loading authService.js")

angular.module('authService', [])

//factory for logging in/out
.factory('Auth', function($rootScope, $http, $q, AuthToken){
	var authFactory = {}

	//handle login
	authFactory.login = function(username, password){
		console.log("running auth.login")
		return $http.post('/api/users/authenticate', {username: username, password: password})
			.success(function(data){
				AuthToken.setToken(data.token)
				$rootScope.$broadcast('AUTH:login')
				return data;
			})	
	}

	//handle logout
	authFactory.logout = function(){
		AuthToken.setToken()
		$rootScope.$broadcast('AUTH:logout')
	}

	//check if user is logged in
	authFactory.isLoggedIn = function(){
		console.log("running isLoggedIn")
		if(AuthToken.getToken()){
			return true
		} else {
			return false
		}
	}

	//get the user info
	authFactory.getUser = function(){
		if(AuthToken.getToken()){
			return $http.get('/api/users/me')
		} else {
			return $q.reject({message: 'User has no token'})
		}
	}

	return authFactory
})

//factory for getting and storing jwt
.factory('AuthToken', function($window){
	var authTokenFactory = {}

	//get the token
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token')
	}

	//save the token, or clear it
	authTokenFactory.setToken = function(token){
		if(token){
			console.log('setting token')
			$window.localStorage.setItem('token', token);
		} else {
			$window.localStorage.removeItem('token');
		}
	}

	return authTokenFactory
})

.factory('AuthInterceptor', function($q, $location,AuthToken){
	var AuthInterceptorFactory = {}

	//attach the token to every request
	AuthInterceptorFactory.request = function(config){
		var token = AuthToken.getToken();
		
		if(token){
			config.headers['x-access-token'] = token;
		}

		return config
	}

	//redirect if token doesn't authenticate
	AuthInterceptorFactory.responseError = function(response){
		if(response.status === 403){
			$location.path('/login')
		}
		return $q.reject(response)
	}

	return AuthInterceptorFactory
})