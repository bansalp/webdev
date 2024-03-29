(function () {

    angular
        .module("MovieTimeApp")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController(UserService) {
        var vm = this;

        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.updateProfileApi = "/api/project/user/" + user._id;

                        UserService
                            .findUserById(vm.user._id)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.loggedOnUser = user;
                                }
                            });
                    }
                });
        }

        init();

        function update(user) {
            UserService
                .updateUser(user)
                .then(function (response) {
                    if (response.data) {
                        vm.user = response.data;
                        alert("Profile updated successfully!");
                    }
                    else {
                        alert("Error updating user information!")
                    }
                });
        }
    }

})();