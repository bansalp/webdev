var mock = require("./form.mock.json");

module.exports = function () {
    var api = {
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        createForm: createForm,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return api;

    function findAllForms() {
        return mock;
    }

    function findFormById(formId) {
        for (var f in mock) {
            if (mock[f]._id === formId) {
                return mock[f];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for (var f in mock) {
            if (mock[f].title === title) {
                return mock[f];
            }
        }
        return null;
    }

    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
        mock.push(form);
        return form;
    }

    function updateForm(formId, newForm) {
        for (var f in mock) {
            if (mock[f]._id === formId) {
                mock[f] = newForm;
                return newForm;
            }
        }
        return null;
    }

    function deleteForm(formId) {
        var index = findIndexByFormId(formId);
        mock.splice(index, 1);
        return mock;
    }

    function findIndexByFormId(formId) {
        var index = 0;
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                return index;
            }
            index++;
        }
    }
}