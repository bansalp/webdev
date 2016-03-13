(function(){

    angular
        .module("MovieTimeApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService)
    {
        $scope.logout = logout;

        function logout()
        {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }

})();