"use strict";
(function () {

    angular
        .module("MovieTimeApp")
        .controller("MainController", MainController);

    function MainController($state, $rootScope) {
        function init() {
            $rootScope.$on('$viewContentLoading',
                function (event, viewConfig) {
                    console.log(event);
                    $rootScope.isToggleMenuVisible = $state.includes("profile");
                });
        }

        init();
    }

})();
