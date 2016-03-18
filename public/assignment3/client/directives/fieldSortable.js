(function () {
    angular
        .module("fieldSortable", [])
        .directive("fieldSortable", fieldSortable);

    function fieldSortable(FieldService) {
        var start = null;
        var end = null;

        function link(scope, element, attributes) {
            var fieldAxis = attributes.fieldAxis;
            $(element).sortable({
                axis: fieldAxis,
                handle: '.sortHandle',
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    end = ui.item.index();
                    scope.fieldControllerModel.fields.splice(end, 0,
                        scope.fieldControllerModel.fields.splice(start, 1)[0]);
                    FieldService
                        .reorderFields(scope.fieldControllerModel.formId, start, end)
                        .then(function (response) {
                            var fields = response.data;
                            if (fields) {
                                scope.fieldControllerModel.fields = fields;
                            }
                        });

                }
            });
        }

        return {
            link: link
        }
    }
})();