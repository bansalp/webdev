"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService, UserService) {
        var vm = this;

        vm.addForm = addForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;

        function init() {
            var loggedInUser = UserService.getCurrentUser();

            if (loggedInUser === undefined) {
                $location.url("/home");
                return;
            } else {
                vm.user = loggedInUser;
                vm.selected = -1;
                updateFormsForCurrentUser();
            }
        }

        init();

        function addForm(form) {
            if (form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                return;
            }

            FormService.createFormForUser(vm.user._id, form, function (newForm) {
                vm.selected = -1;
                vm.form = {};
                updateFormsForCurrentUser();
            });
        }

        function updateForm(form) {
            if (form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                vm.selected = -1;
                vm.form = {};
                return;
            }

            FormService.updateFormById(form, function (newForm) {
                vm.forms[vm.selected] = newForm;
                vm.selected = -1;
                vm.form = {};
            });
        }

        function deleteForm(index) {
            FormService.deleteFormById(
                vm.forms[index]._id,
                function (udpatedForms) {
                    vm.selected = -1;
                    vm.form = {};
                    updateFormsForCurrentUser();
                });
        }

        function selectForm(index) {
            var editForm = {
                "_id": vm.forms[index]["_id"],
                "userId": vm.forms[index]["userId"],
                "title": vm.forms[index]["title"]
            };
            vm.form = editForm;
            vm.selected = index;
        }

        function updateFormsForCurrentUser() {
            FormService.findAllFormsForUser(vm.user._id, function (formsByUserId) {
                vm.forms = formsByUserId;
            });
        }
    }

})();