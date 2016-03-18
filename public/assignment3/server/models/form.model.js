"use strict";
var mock = require("./form.mock.json");

module.exports = function (uuid) {
    var api = {
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        findUserFormByTitle: findUserFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById
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

    function findUserFormByTitle(userId, title) {
        for (var f in mock) {
            if (mock[f].title === title && mock[f].userId == userId) {
                return mock[f];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId) {
        var forms = mock.filter(function (form, index, arr) {
            return (form.userId == userId);
        });
        return forms;
    }

    function createFormForUser(userId, form) {
        form._id = uuid.v4();
        form.userId = userId;
        mock.push(form);
        return mock;
    }

    function updateFormById(formId, newForm) {
        for (var f in mock) {
            if (mock[f]._id === formId) {
                mock[f] = newForm;
                return mock;
            }
        }
        return null;
    }

    function deleteFormById(formId) {
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