"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;

        vm.logOut = logOut;

        function init() {

        }

        init();

        function logOut() {
            delete UserService.deleteCurrentUser();
            $location.url("/home");
        }
    }

})();