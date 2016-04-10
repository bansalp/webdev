(function () {

    angular
        .module("MovieTimeApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($stateParams, $state, $rootScope) {
        var vm = this;

        vm.userId = $stateParams.userId;
        console.log(vm.userId);

        function init() {
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams, options) {
                    $rootScope.isToggleMenuVisible = false;
                });

            $rootScope.isToggleMenuVisible = $state.includes("profile");
        }

        init();
    }

})();