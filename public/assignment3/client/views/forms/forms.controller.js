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
                    var user = response.data;
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

        init();

        function addForm(form) {
            if (form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                return;
            }

            FormService
                .findUserFormByTitle(vm.user._id, form.title)
                .then(function (res) {
                    var resForm = res.data;
                    if (!resForm) {
                        FormService
                            .createForm(vm.user._id, form)
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

        function updateForm(form) {
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
                            .updateForm(form._id, form)
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

        function deleteForm(index) {
            FormService
                .deleteForm(vm.forms[index]._id)
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