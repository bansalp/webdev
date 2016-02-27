(function () {

    angular
        .module("routerApp")
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/home');

        $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: 'views/home/partial.home.view.html'
            })

            // nested list with custom controller
            .state('home.list', {
                url: '/list',
                templateUrl: 'views/home/partial.home.list.view.html',
                controller: function ($scope) {
                    $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
                }
            })

            // nested list with just some random string data
            .state('home.paragraph', {
                url: '/paragraph',
                template: 'I could sure use a drink right now.'
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('about', {
                url: '/about',
                views: {

                    // the main template will be placed here (relatively named)
                    '': {templateUrl: 'views/about/partial.about.view.html'},

                    // the child views will be defined here (absolutely named)
                    'columnOne@about': {template: 'Look I am a column!'},

                    // for column two, we'll define a separate controller
                    'columnTwo@about': {
                        templateUrl: 'views/about/table.data.view.html',
                        controller: 'scotchController'
                    }
                }
            });
    }

})();