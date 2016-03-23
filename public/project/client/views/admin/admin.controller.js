(function () {

    angular
        .module("MovieTimeApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {
        function init() {
            UserService.findAllUsers(function (users) {
                $scope.users = users;
            });
        }

        init();

        $scope.roles = [
            {name: "user", value: "user"},
            {name: "admin", value: "admin"}
        ];

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.selected = -1;

        function addUser(user)
        {
            if(!isUserValid(user)) {
                return;
            }
            UserService.createUser(user, function(newUser) {
                $scope.selected = -1;
                $scope.user = {};
                UserService.findAllUsers(function(users){
                    $scope.users = users;
                });
            });
        }

        function updateUser(user) {
            if(!isUserValid(user)) {
                return;
            }
            UserService.updateUserById(user._id, user, function(newUser) {
                $scope.users[$scope.selected] = newUser;
                $scope.selected = -1;
                $scope.user = {};
            });
        }

        function deleteUser(user) {
            UserService.deleteUserById(user._id, function (users) {
                $scope.selected = -1;
                $scope.user = {};
                $scope.users = users;
            });
        }

        function selectUser(index) {
            UserService.findUserByIndex(index, function (user) {
                $scope.user = user;
                $scope.selected = index;
            });
        }

        function isUserValid(user) {
            return user != undefined && user.username.trim() !== "" && user.password.trim() !== "" &&
                user.firstName.trim() !== "" && user.lastName.trim() !== "" && user.email && user.email.trim() !== "" &&
                user.role.trim() !== "";
        }
    }

})();