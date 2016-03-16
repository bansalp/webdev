var mock = require("./form.mock.json");

module.exports = function () {
    var api = {
        createFieldForForm: createFieldForForm,
        getFieldsForForm: getFieldsForForm,
        getFieldForForm: getFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        updateField: updateField
    };
    return api;

    function createFieldForForm(formId, field) {
        var fields = getFieldsForForm(formId);
        field._id = "ID_" + (new Date()).getTime();
        fields.push(field);
        return fields;
    }

    function getFieldsForForm(formId) {
        var form = mock.filter(function (frm, index, arr) {
            return (frm._id == formId);
        });
        return form.fields;
    }

    function getFieldForForm(formId, fieldId) {
        var fields = getFieldsForForm(formId);
        var field = fields.filter(function (fld, index, arr) {
            return (fld._id == fieldId);
        });
        return field;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var fields = getFieldsForForm(formId);
        var fieldIndex = findIndexByFieldId(fields, fieldId);
        fields.splice(fieldIndex, 1);
        return fields;
    }

    function updateField(formId, fieldId, field) {
        var fields = getFieldsForForm(formId);
        var fieldIndex = findIndexByFieldId(fields, fieldId);
        fields[fieldIndex] = field;
        return fields;
    }

    function findIndexByFieldId(fields, fieldId) {
        var index = 0;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i]._id === fieldId) {
                return index;
            }
            index++;
        }
    }
}