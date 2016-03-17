"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, UserService) {
        var vm = this;

        vm.createFormForUser = createFormForUser;
        vm.selectForm = selectForm;
        vm.updateFormById = updateFormById;
        vm.deleteFormById = deleteFormById;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.selected = -1;
                        FormService
                            .findAllFormsForUser(user._id)
                            .then(function (resp) {
                                var forms = resp.data;
                                vm.forms = forms;
                            });
                    }
                });
        }

        init();

        function createFormForUser(form) {
            if (form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                return;
            }

            FormService
                .findUserFormByTitle(vm.user._id, form.title)
                .then(function (res) {
                    var resForm = res.data;
                    if (!resForm) {
                        FormService
                            .createFormForUser(vm.user._id, form)
                            .then(function (response) {
                                var forms = response.data;
                                if (forms) {
                                    vm.selected = -1;
                                    vm.form = {};
                                    vm.forms = forms;
                                }
                            });
                    } else {
                        alert("Form with the same title already exists!");
                    }
                });
        }

        function updateFormById(form) {
            if (form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                vm.selected = -1;
                vm.form = {};
                return;
            }
            var selectedForm = vm.forms[vm.selected];
            if (selectedForm.title == form.title) {
                vm.selected = -1;
                vm.form = {};
                return;
            }

            FormService
                .findUserFormByTitle(vm.user._id, form.title)
                .then(function (res) {
                    var resForm = res.data;
                    if (!resForm) {
                        FormService
                            .updateFormById(form._id, form)
                            .then(function (response) {
                                var forms = response.data;
                                if (forms) {
                                    vm.selected = -1;
                                    vm.form = {};
                                    vm.forms = forms;
                                }
                            });
                    } else {
                        alert("Form with the same title already exists!");
                    }
                });
        }

        function deleteFormById(index) {
            FormService
                .deleteFormById(vm.forms[index]._id)
                .then(function (response) {
                    var forms = response.data;
                    if (forms) {
                        vm.selected = -1;
                        vm.form = {};
                        vm.forms = forms;
                    }
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
    }

})();