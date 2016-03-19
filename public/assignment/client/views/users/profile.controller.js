"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService) {
        var vm = this;

        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                    }
                });
        }

        init();

        function update(user) {
            UserService
                .updateUser(user)
                .then(function (response) {
                    var users = response.data;
                    if (users) {
                        UserService
                            .findUserByUsername(user.username)
                            .then(function (res) {
                                var resUser = res.data;
                                if (resUser) {
                                    vm.user = resUser;
                                }
                            });
                    }
                    else {
                        alert("Error updating user information!")
                    }
                });
        }
    }

})();
