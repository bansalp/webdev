"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {
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
            UserService.updateUser(user, function (updatedUser) {
                UserService.setCurrentUser(updatedUser);
            });
        }
    }

})();
