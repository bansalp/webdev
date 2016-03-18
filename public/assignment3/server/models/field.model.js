var mock = require("./form.mock.json");

module.exports = function (uuid) {
    var api = {
        createFieldForForm: createFieldForForm,
        cloneFieldForForm: cloneFieldForForm,
        getFieldsForForm: getFieldsForForm,
        getFieldForForm: getFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        updateField: updateField,
        reorderFields: reorderFields
    };
    return api;

    function createFieldForForm(formId, field) {
        var fields = getFieldsForForm(formId);
        field._id = uuid.v4();
        if (!fields) {
            fields = [];
            var form = findFormById(formId);
            form.fields = fields;
        }
        fields.push(field);
        return fields;
    }

    function cloneFieldForForm(formId, field) {
        var existingField = getFieldForForm(formId, field._id);
        var jsonString = JSON.stringify(existingField);
        var jsonStringNew = jsonString;
        var newField = JSON.parse(jsonStringNew);
        var fields = getFieldsForForm(formId);
        var index = findIndexByFieldId(fields, existingField._id);
        newField._id = uuid.v4();
        fields.splice(index + 1, 0, newField);
        return fields;
    }

    function findFormById(formId) {
        for (var f in mock) {
            if (mock[f]._id === formId) {
                return mock[f];
            }
        }
        return null;
    }

    function getFieldsForForm(formId) {
        var form = mock.filter(function (frm, index, arr) {
            return (frm._id == formId);
        });
        return form[0].fields;
    }

    function getFieldForForm(formId, fieldId) {
        var fields = getFieldsForForm(formId);
        var field = fields.filter(function (fld, index, arr) {
            return (fld._id === fieldId);
        });
        return field[0];
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

    function reorderFields(formId, start, end) {
        var form = findFormById(formId);
        var fields = form.fields;
        fields.splice(end, 0, fields.splice(start, 1)[0]);
        return fields;
    }
}