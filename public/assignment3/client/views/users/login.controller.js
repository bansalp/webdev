"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function init() {

        }

        init();

        function login(user) {
            UserService
                .findUserByCredentials(user)
                .then(function (response) {
                    var resUser = response.data;
                    if (resUser) {
                        UserService.setCurrentUser(resUser.username);
                        $location.url("/profile");
                    }
                    else {
                        alert("Wrong username or password!")
                    }
                });
        }
    }

})();
