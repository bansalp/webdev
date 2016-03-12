"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location) {
        var vm = this;

        vm.logOut = logOut;

        function init() {

        }

        init();

        function logOut() {
            delete $rootScope.user;
            $location.url("/home");
        }
    }

})();