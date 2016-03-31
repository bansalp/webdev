"use strict";
module.exports = function (app, fieldModel) {
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.post("/api/assignment/form/:formId/field/clone", cloneFieldForForm);
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.put("/api/assignment/form/:formId/fields/:start/:end", reorderFields);

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;

        fieldModel
            .createFieldForForm(formId, field)
            .then(
                function (form) {
                    res.json(form.fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function cloneFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fields = model.cloneFieldForForm(formId, field);
        res.json(fields);
    }

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;

        fieldModel
            .getFieldsForForm(formId)
            .then(
                function (form) {
                    res.json(form.fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel
            .getFieldForForm(formId, fieldId)
            .then(
                function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel
            .deleteFieldFromForm(formId, fieldId)
            .then(
                function (form) {
                    res.json(form.fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        fieldModel
            .updateField(formId, fieldId, field)
            .then(
                function (form) {
                    res.json(form.fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function reorderFields(req, res) {
        var formId = req.params.formId;
        var start = req.params.start;
        var end = req.params.end;
        var fields = model.reorderFields(formId, start, end);
        res.json(fields);
    }
}