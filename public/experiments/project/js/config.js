(function () {

    angular
        .module("MovieTimeApp")
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise("/home");

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .state("details", {
                url: "/details/:movieId",
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController"
            })
            .state("login", {
                url: "/login",
                templateUrl: "views/users/login/login.view.html"
            })
            .state("forgot-password", {
                url: "/forgot-password",
                templateUrl: "views/users/login/forgot-password/forgot-password.view.html"
            })
            .state("register", {
                url: "/register",
                templateUrl: "views/users/register/register.view.html"
            })
    }

})();