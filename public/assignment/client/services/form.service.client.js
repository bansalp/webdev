"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        var api = {
            findAllFormsForUser: findAllFormsForUser,
            findUserFormByTitle: findUserFormByTitle,
            findFormById: findFormById,
            createFormForUser: createFormForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function findUserFormByTitle(userId, title) {
            return $http.get("/api/assignment/user/" + userId + "/form/" + title);
        }

        function findFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, form) {
            return $http.put("/api/assignment/form/" + formId, form);
        }
    }

})();