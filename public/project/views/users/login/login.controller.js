(function () {

    angular
        .module("MovieTimeApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.login = login;

        function login(user) {
            $scope.errorMessage = "";
            UserService.findUserByCredentials(user, redirectUserToProfileIfValid);
        }

        function redirectUserToProfileIfValid(user) {
            if (user != null) {
                UserService.setCurrentUser(user);
                $location.url("/profile/edit-profile");
            }
            else {
                $scope.errorMessage = "Username or password is incorrect!";
            }
        }
    }

})();