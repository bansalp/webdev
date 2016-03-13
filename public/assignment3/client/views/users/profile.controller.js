"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService) {
        var vm = this;

        vm.update = update;

        function init() {
            var loggedInUser = UserService.getCurrentUser();
            if (loggedInUser === undefined) {
                $location.url("/home");
                return;
            }
            else {
                vm.user = loggedInUser;
            }
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
                                    UserService.setCurrentUser(resUser);
                                    vm.user = resUser;
                                }
                            })
                    }
                    else {
                        alert("Error updating user information!")
                    }
                });
        }
    }

})();
