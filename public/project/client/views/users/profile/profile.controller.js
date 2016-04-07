(function () {

    angular
        .module("MovieTimeApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($stateParams) {
        var vm = this;

        vm.username = $stateParams.username;
        console.log(vm.username);

        function init() {

        }

        init();
    }

})();