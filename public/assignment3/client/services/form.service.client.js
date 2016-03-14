"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        var api = {
            findFormByUserId: findFormByUserId,
            createForm: createForm
        };
        return api;

        function findFormByUserId(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function createForm(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }
    }

})();