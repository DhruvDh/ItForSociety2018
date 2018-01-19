var app = angular.module('ait', ['ngMaterial', 'ngAnimate', 'ngRoute']);

app.run(function ($route, $http, $templateCache, $window, $rootScope, $location, $mdTheming, authService) {
    function storageAvailable() {
        try {
            var storage = $window.localStorage,
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            console.log("localStorage available.");
            return true;
        }
        catch (e) {
            console.log("localStorage unavailable.");
            return false;
        }
    };

    $rootScope.storageAvailable = storageAvailable();

    var url;
    for (var i in $route.routes) {
        if (url = $route.routes[i].templateUrl) {
            $http.get(url, { cache: $templateCache });
        }
    }

    if ($rootScope.storageAvailable) {
        var storage = $window.localStorage;
        console.log("Attempting to login by " + storage.getItem('userID'))
        if (typeof storage.getItem("userID") == "undefined")
            console.log('It is infact, undefined')
        else
            authService.login({
                "username": storage.getItem("username"),
                "userID": storage.getItem("userID")
            });
    }

    console.log("In run, response is: " + $rootScope.response)
    console.log('My app is ready.');
});

app.config(function ($mdThemingProvider, $routeProvider, $locationProvider) {
    $mdThemingProvider.theme('default').primaryPalette('yellow');
    $mdThemingProvider.enableBrowserColor({
        theme: 'default',
        palette: 'primary',
        hue: '800'
    });

    $locationProvider.html5Mode({ enabled: true, requireBase: false });

    $routeProvider.
        when('/login', {
            templateUrl: 'login.html',
            controller: 'loginControl'
        }).
        when('/overview', {
            templateUrl: 'overview.html',
            controller: 'toDoControl'
        }).
        when('/register', {
            templateUrl: 'register.html',
            controller: 'regControl'
        }).
        otherwise({
            redirectTo: '/login'
        });
});

app.controller('toDoControl', function ($scope, $http, $window) {
    $scope.toDoList = [];
    $scope.postQuery = function() {
        var id = $window.sessionStorage.getItem("userID");
        if(id)
        {
        console.log("Session id is: "+id);
        $http.post('/training', { "_id":  id, "query": $scope.toDoQuery}).then(
            function(res, status) {
                $scope.toDoList = [];
                $scope.res = res.data;
                res.data.toDoList.forEach(function(todo, index, todos) {
                    $scope.toDoList.push(todo.query);
                }); console.log(res.reply)
            }, function() {
                console.log("Could not get");
            })
        }
    }    
});

app.controller('loginControl', function ($scope, authService, $window, $location) {
    $scope.postData = function () {
        if ($scope.username && $scope.password) {
            var formData = {
                "username": $scope.username,
                "password": $scope.password
            };
            console.log('Clicked go');
            authService.login(formData);
        }
        else
            console.log("Username or password is empty");
    };
    $scope.goToRegister = function () {
        $location.path('/register')
    }
});

app.controller('regControl', function ($scope, $http, $location) {
    $scope.user = "";
    $scope.pass = "";
    $scope.batch = "";
    $scope.postData = function () {
        console.log({
            "user": $scope.user,
            "pass": $scope.pass,
            "batch": $scope.batch
        });
        $http.post('/register', {
            "user": $scope.user,
            "pass": $scope.pass,
            "batch": $scope.batch
        }).success(function(res, status) {
            $location.path('/login');
        })
    }
})

app.service('authService', function ($http, $window, $location, $rootScope) {
    var response;
    var storage = $window.localStorage;

    this.login = function (credentials) {
        console.log('in this.login')
        $http.post('/login', credentials)
            .then(function (res, status) {
                response = res.data;
                console.log(response)
                if ($rootScope.storageAvailable) {
                    storage.setItem("userID", response.id);
                    storage.setItem("username", response.username);
                    $window.sessionStorage.setItem("userID", response.id);
                    $window.sessionStorage.setItem("username", response.username);
                    console.log('getItem: studentContext: '+storage.getItem('studentContext'));
                    $location.path('/overview');
                }
            }, function () {
                if ($rootScope.storageAvailable)
                    storage.removeItem("studentContext");
                console.log("Sorry, could not post.");
            });
    };
});
