(function() {

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.register = register;

        function register(user) {
            UserService.createUser(user, function(user) {
                $rootScope.user = user;
                console.log(user);
                $location.url("/profile");
            });
        }
    }

})();