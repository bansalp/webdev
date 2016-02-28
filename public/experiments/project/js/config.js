(function () {

    angular
        .module("MovieTimeApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/header", {
                templateUrl: "views/header/header.view.html"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html"
            })
            .when("/forgot-password", {
                templateUrl: "views/login/forgot-password/forgot-password.view.html"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html"
            })
            .otherwise({
                redirectTo : "/home"
            })
    }

})();