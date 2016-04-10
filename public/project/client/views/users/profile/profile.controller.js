(function () {

    angular
        .module("MovieTimeApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($stateParams) {
        var vm = this;

        vm.toggleMenu = toggleMenu;
        
        vm.userId = $stateParams.userId;
        console.log(vm.userId);

        function init() {

        }

        init();

        function toggleMenu() {
            $("#wrapper").toggleClass("toggled");
        }
    }

})();