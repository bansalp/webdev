module.exports = function (app, model) {
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.post("/api/assignment/form/:formId/field/clone", cloneFieldForForm);
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fields = model.createFieldForForm(formId, field);
        res.json(fields);
    }

    function cloneFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fields = model.cloneFieldForForm(formId, field);
        res.json(fields);
    }

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = model.getFieldsForForm(formId);
        res.json(fields);
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = model.getFieldForForm(formId, fieldId);
        res.json(field);
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = model.deleteFieldFromForm(formId, fieldId);
        res.json(fields);
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var fields = model.updateField(formId, fieldId, field);
        res.json(fields);
    }
}