"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        function init() {

        }

        init();

        function register(user) {
            UserService
                .register(user)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user != null) {
                            UserService.setCurrentUser(user);
                            $location.url("/profile");
                        } else {
                            alert("User already exists");
                        }
                    },
                    function (err) {
                        alert("User already exists");
                    }
                );
        }
    }

})();