"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {
        var vm = this;

        vm.addField = addField;

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
            if (fieldType == -1)
            {
                alert("Please select a value for Add New Field");
                return;
            }

            vm.fieldType = fieldType;
        }
    }

})();