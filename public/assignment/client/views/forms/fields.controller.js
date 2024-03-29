"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FormService, FieldService) {
        var vm = this;

        vm.addField = addField;
        vm.removeField = removeField;
        vm.updateField = updateField;
        vm.cloneField = cloneField;
        vm.editField = editField;

        var fieldTypesDefault = [
            {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
            {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
            {"label": "New Date Field", "type": "DATE"},
            {
                "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]
            },
            {
                "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]
            },
            {
                "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]
            },
            {"label": "New Email Field", "type": "EMAIL", "placeholder": "New Field"},
            {"label": "New Password Field", "type": "PASSWORD", "placeholder": "New Field"}
        ];

        function init() {
            vm.fieldTypes = ["Single Line Text Field", "Multi Line Text Field", "Date Field", "Dropdown Field", "Checkboxes Field", "Radio Buttons Field", "Email Field", "Password Field"];
            vm.fieldType = -1;
            vm.formId = $routeParams.formId;

            FormService
                .findFormById(vm.formId)
                .then(function (response) {
                    var form = response.data;
                    if (form) {
                        vm.formTitle = form.title;
                    }
                });

            FieldService
                .getFieldsForForm(vm.formId)
                .then(function (response) {
                    var fields = response.data;
                    if (fields) {
                        vm.fields = fields;
                    }
                });
        }

        init();

        function addField(fieldType) {
            if (fieldType == -1) {
                alert("Please select a value for Add New Field");
                return;
            }

            var newField = fieldTypesDefault[fieldType];
            FieldService
                .createFieldForForm(vm.formId, newField)
                .then(function (response) {
                    var fields = response.data;
                    if (fields) {
                        vm.fields = fields;
                        vm.fieldType = -1;
                    }
                });
        }

        function removeField(fieldId) {
            FieldService
                .deleteFieldFromForm(vm.formId, fieldId)
                .then(function (response) {
                    var fields = response.data;
                    if (fields) {
                        vm.fields = fields;
                        vm.fieldType = -1;
                    }
                });
        }

        function updateField(field) {
            if (field.label.trim() != "") {
                var flag = true;
                if (vm.options.length != 0) {
                    var optionsJson = getJSON(vm.options);
                    if (optionsJson.length === 0) {
                        flag = false;
                        return;
                    }
                    else {
                        field.options = optionsJson;
                    }
                }

                if (flag) {
                    FieldService
                        .updateField(vm.formId, field._id, field)
                        .then(function (response) {
                            if (response.data) {
                                vm.fields = response.data;
                            }
                        });
                }
            }
        }

        function getJSON(optionsArr) {
            var options = [];
            for (var u in optionsArr) {
                var pairs = optionsArr[u].split(':');
                if (pairs[0].trim() != "" && pairs[1].trim() != "") {
                    var opt = {
                        "label": pairs[0],
                        "value": pairs[1]
                    }
                    options.push(opt);
                }
                else {
                    return [];
                }
            }
            return options;
        }

        function cloneField(fieldId) {
            FieldService
                .getFieldForForm(vm.formId, fieldId)
                .then(function (response) {
                    var field = response.data;
                    if (field) {
                        FieldService
                            .cloneFieldForForm(vm.formId, field)
                            .then(function (res) {
                                var fields = res.data;
                                if (fields) {
                                    vm.fields = fields;
                                    vm.fieldType = -1;
                                }
                            });
                    }
                });
        }

        function editField(field) {
            var jsonString = JSON.stringify(field);
            var jsonStringNew = jsonString;
            var newField = JSON.parse(jsonStringNew);
            var index = getFieldIndexInFieldTypesDefault(newField.type);
            var newFieldType = vm.fieldTypes[index];
            if (newField.options) {
                var options = getArray(newField.options);
                vm.options = options;
                vm.rows = options.length;
            }
            vm.newFieldType = newFieldType;
            vm.newField = newField;
        }

        function getArray(options) {
            var optionsArr = [];
            var opt = "";
            for (var u in options) {
                opt = options[u].label + ":" + options[u].value;
                optionsArr.push(opt);
            }
            return optionsArr;
        }

        function getFieldIndexInFieldTypesDefault(fieldType) {
            var index = 0;
            for (var i = 0; i < fieldTypesDefault.length; i++) {
                if (fieldTypesDefault[i].type === fieldType) {
                    return index;
                }
                index++;
            }
        }
    }

})();