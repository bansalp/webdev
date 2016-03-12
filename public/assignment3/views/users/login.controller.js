"use strict";
(function() {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;

        function login(username, password) {
            UserService.findUserByCredentials(username, password, redirectUserToProfileIfValid);
        }

        function redirectUserToProfileIfValid(user) {
            if(user != null){
                $rootScope.user = user;
                $location.url("/profile")
            }
        }
    }

})();
