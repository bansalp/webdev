"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {
        var vm = this;

        vm.addField = addField;
        
        var fieldTypesDefault = [
            {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
            {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
            {"_id": null, "label": "New Date Field", "type": "DATE"},
            {
                "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]
            },
            {
                "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]
            },
            {
                "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]
            }
        ];

        function init() {
            vm.fieldTypes = ["Single Line Text Field", "Multi Line Text Field", "Date Field", "Dropdown Field", "Checkboxes Field", "Radio Buttons Field"];
            vm.fieldType = -1;
            vm.formId = $routeParams.formId;
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

            vm.fieldType = fieldType;
        }
    }

})();