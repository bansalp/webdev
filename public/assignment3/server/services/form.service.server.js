module.exports = function (app, model) {
    app.get("/api/assignment/user/:userId/form", findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.get("/api/assignment/user/:userId/form/:formTitle", findUserFormByTitle);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormByUserId(req, res) {
        var userId = req.params.userId;
        var forms = model.findFormByUserId(userId);
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

    function deleteForm(req, res) {
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        var userId = form.userId;
        model.deleteForm(formId);
        findFormsByUserId(userId, res);
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        model.createForm(userId, form);
        findFormByUserId(req, res);
    }

    function updateForm(req, res) {
        var reqFormId = req.params.formId;
        var reqForm = req.body;
        model.updateForm(reqFormId, reqForm);
        findFormsByUserId(reqForm.userId, res);
    }

    function findFormsByUserId(userId, res) {
        var forms = model.findFormByUserId(userId);
        res.json(forms);
    }
}