"use strict";
module.exports = function (db) {
    var FormSchema = require("./form.schema.server.js")(db);
    var FormModel = db.model('FormModel', FormSchema);

    var api = {
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        findUserFormByTitle: findUserFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        getMongooseModel: getMongooseModel
    };
    return api;

    function findAllForms() {
        return FormModel.find();
    }

    function findFormById(formId) {
        return FormModel.findById(formId);
    }

    function findFormByTitle(title) {
        return FormModel.findOne({title: title});
    }

    function findUserFormByTitle(userId, title) {
        return FormModel.findOne({userId: userId, title: title});
    }

    function findAllFormsForUser(userId) {
        return FormModel.find({userId: userId});
    }

    function createFormForUser(userId, form) {
        form.userId = userId;
        return FormModel.create(form);
    }

    function updateFormById(formId, form) {
        delete form._id;
        form.updated = Date.now();
        return FormModel.update({_id: formId}, {$set: form});
    }

    function deleteFormById(formId) {
        return FormModel.remove({_id: formId});
    }

    function getMongooseModel() {
        return FormModel;
    }
}