"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
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
                    $location.url("/home");
                });
        }
    }

})();