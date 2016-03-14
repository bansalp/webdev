module.exports = function (app, model) {
    app.get("/api/assignment/user/:userId/form", findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
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

    function deleteForm(req, res) {
        var formId = req.params.formId;
        var forms = model.deleteForm(formId);
        res.json(forms);
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var forms = model.createForm(userId, form);
        res.json(forms);
    }

    function updateForm(req, res) {
        var reqFormId = req.params.formId;
        var reqForm = req.body;
        var forms = model.updateForm(reqFormId, reqForm);
        res.json(forms);
    }
}