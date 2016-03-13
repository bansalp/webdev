"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "registerControllerModel"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "loginControllerModel"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "profileControllerModel",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "formControllerModel",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "adminControllerModel",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            })
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var username = response.data;
                UserService.setCurrentUser(username);
                deferred.resolve();
            });
        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var username = response.data;
                if (username) {
                    UserService.setCurrentUser(username);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });
        return deferred.promise;
    }

})();