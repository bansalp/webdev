"use strict";
(function () {
    angular
        .module("MovieTimeApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var model = this;

        model.remove = remove;
        model.update = update;
        model.add = add;
        model.select = select;

        function init() {
            model.selected = -1;
            UserService
                .findAllUsersAdmin()
                .then(handleSuccess, handleError);
        }

        init();

        model.predicate = 'username';
        model.reverse = true;
        model.order = function (predicate) {
            model.reverse = (model.predicate === predicate) ? !model.reverse : false;
            model.predicate = predicate;
        };

        function remove(user) {
            UserService
                .deleteUserAdmin(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user) {
            UserService
                .updateUserAdmin(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user) {
            UserService
                .createUserAdmin(user)
                .then(handleSuccess, handleError);
        }

        function select(user) {
            model.inputUser = angular.copy(user);
            model.selected = 0;
        }

        function handleSuccess(response) {
            model.users = response.data;
            model.inputUser = {};
            model.selected = -1;
        }

        function handleError(error) {
            model.error = error;
        }
    }
})();