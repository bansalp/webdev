"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, FormService, UserService) {
        var vm = this;

        vm.addForm = addForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var username = response.data;
                    if (username) {
                        UserService
                            .findUserByUsername(username)
                            .then(function (res) {
                                var user = res.data;
                                if (user) {
                                    vm.user = user;
                                    vm.selected = -1;
                                    FormService
                                        .findFormByUserId(user._id)
                                        .then(function (resp) {
                                            var forms = resp.data;
                                            vm.forms = forms;
                                        });
                                }
                            });
                    }
                });
        }

        init();

        function addForm(form) {
            if (form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                return;
            }
            FormService
                .createForm(vm.user._id, form)
                .then(function (response) {
                    var forms = response.data;
                    if (forms) {
                        vm.selected = -1;
                        vm.form = {};
                        FormService
                            .findFormByUserId(vm.user._id)
                            .then(function (resp) {
                                var resForms = resp.data;
                                if (resForms) {
                                    vm.forms = resForms;
                                }
                            });
                    }
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