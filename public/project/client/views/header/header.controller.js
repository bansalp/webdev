"use strict";
(function () {

    angular
        .module("MovieTimeApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($state, UserService) {
        var vm = this;

        vm.logout = logout;

        function init() {

        }

        init();

        function logout() {
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $state.go("home");
                });
        }
    }

})();