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
                                var createdForm = response.data;
                                if (createdForm) {
                                    vm.selected = -1;
                                    vm.form = {};
                                    vm.forms.push(createdForm);
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
                                var status = response.data;
                                console.log(status);
                                if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                                    vm.forms[vm.selected] = form;
                                    vm.selected = -1;
                                    vm.form = {};
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
                    var status = response.data;
                    console.log(status);
                    if (status.n == 1 && status.ok == 1) {
                        vm.forms.splice(index, 1);
                        vm.selected = -1;
                        vm.form = {};
                    }
                });
        }

        function selectForm(index) {
            var editForm = {
                "_id": vm.forms[index]["_id"],
                "userId": vm.forms[index]["userId"],
                "title": vm.forms[index]["title"],
                "fields": vm.forms[index]["fields"]
            };
            vm.form = editForm;
            vm.selected = index;
        }
    }

})();