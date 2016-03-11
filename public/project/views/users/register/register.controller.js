(function () {

    angular
        .module("MovieTimeApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService) {
        $scope.register = register;

        function register(user) {
            $scope.errorMessage = "";
            UserService.findUserByUsername(user, doRegister);
        }

        function doRegister(user) {
            if (user != null) {
                UserService.createUser(user, redirectUserToProfileIfValid);
            } else {
                $scope.errorMessage = "Username already exists!";
            }
        }

        function redirectUserToProfileIfValid(user) {
            if(user != null){
                UserService.setCurrentUser(user);
                $location.url("/profile/edit-profile");
            }
        }
    }

})();