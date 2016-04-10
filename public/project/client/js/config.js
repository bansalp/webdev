(function () {

    angular
        .module("MovieTimeApp")
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when("/details/", "/home")
            .otherwise("/home/");

        $stateProvider
            .state("home", {
                url: "/home/:movieTitle",
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .state("details", {
                url: "/details/:movieId",
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "detailsControllerModel",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .state("login", {
                url: "/login",
                templateUrl: "views/users/login/login.view.html",
                controller: "LoginController",
                controllerAs: "loginControllerModel"
            })
            .state("forgot-password", {
                url: "/forgot-password",
                templateUrl: "views/users/login/forgot-password/forgot-password.view.html"
            })
            .state("register", {
                url: "/register",
                templateUrl: "views/users/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "registerControllerModel"
            })
            .state("profile", {
                url: "/profile",
                templateUrl: "views/users/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "profileControllerModel",
                params: {
                    userId: null
                },
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .state("profile.edit-profile", {
                url: "/:userId/edit-profile",
                templateUrl: "views/users/profile/edit-profile.view.html",
                controller: "EditProfileController",
                controllerAs: "editProfileControllerModel",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .state("profile.change-password", {
                url: "/:userId/change-password",
                templateUrl: "views/users/profile/change-password.view.html"
            })
            .state("profile.followers", {
                url: "/:userId/followers",
                templateUrl: "views/users/profile/followers.view.html"
            })
            .state("profile.following", {
                url: "/:userId/following",
                templateUrl: "views/users/profile/following.view.html",
                controller: "FollowingController",
                controllerAs: "followingControllerModel"
            })
            .state("profile.reviews", {
                url: "/:userId/reviews",
                templateUrl: "views/users/profile/reviews.view.html",
                controller: "ReviewsController",
                controllerAs: "reviewsControllerModel"
            })
            .state("profile.likes", {
                url: "/:userId/likes",
                templateUrl: "views/users/profile/likes.view.html"
            })
            .state("profile.dislikes", {
                url: "/:userId/dislikes",
                templateUrl: "views/users/profile/dislikes.view.html"
            })
            .state("admin", {
                url: "/admin",
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;
                UserService.setCurrentUser(user);
                deferred.resolve();
            });
        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $state) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;

                if (user) {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $state.go("home");
                }
            });
        return deferred.promise;
    }

})();