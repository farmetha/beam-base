UserController = function ($scope, $http){
    $scope.addUser = function (user) {
        $http.post('/api/user/create', user, function (value) {
            //@TODO Registration success handler.
        });
    }

    $scope.login = function (credentials) {
        $http.post('/api/user/login', credentials);
    }
};
