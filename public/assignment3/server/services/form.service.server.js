module.exports = function (app, model) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.get("/api/assignment/user/:userId/form/:formTitle", findUserFormByTitle);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        var forms = model.findAllFormsForUser(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        res.json(form);
    }

    function findUserFormByTitle(req, res) {
        var userId = req.params.userId;
        var formTitle = req.params.formTitle;
        var form = model.findUserFormByTitle(userId, formTitle);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        var userId = form.userId;
        model.deleteFormById(formId);
        findFormsByUserId(userId, res);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        model.createFormForUser(userId, form);
        findAllFormsForUser(req, res);
    }

    function updateFormById(req, res) {
        var reqFormId = req.params.formId;
        var reqForm = req.body;
        model.updateFormById(reqFormId, reqForm);
        findFormsByUserId(reqForm.userId, res);
    }

    function findFormsByUserId(userId, res) {
        var forms = model.findAllFormsForUser(userId);
        res.json(forms);
    }
}