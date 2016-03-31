"use strict";
module.exports = function (formModel) {
    var Form = formModel.getMongooseModel();

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
        return Form.findById(formId)
            .then(
                function (form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
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
        return Form
            .findById(formId)
            .select("fields");
    }

    function getFieldForForm(formId, fieldId) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    return form.fields.id(fieldId);
                }
            );
    }

    function deleteFieldFromForm(formId, fieldId) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function updateField(formId, fieldId, field) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    form.updated = Date.now();
                    var dbField = form.fields.id(fieldId);
                    dbField.label = field.label;
                    dbField.type = field.type;
                    if (field.placeholder || field.placeholder == "") {
                        dbField.placeholder = field.placeholder;
                    }
                    if (field.options.length > 0) {
                        dbField.options = field.options;
                    }
                    return form.save();
                }
            );
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