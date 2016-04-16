(function () {

    angular
        .module("MovieTimeApp")
        .controller("HomeController", HomeController);

    function HomeController(MovieService) {
        var vm = this;

        vm.slide = slide;

        var slides = [];

        function init() {
            $('#myCarousel').carousel({
                interval: 5000
            });

            var imageUrl = MovieService.getImageURL();
            vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);

            MovieService
                .findUpcomingMovies()
                .then(function (response) {
                    response.data.results.forEach(function (element1, index1, array1) {
                        if (element1.backdrop_path) {
                            element1.imageUrl = vm.imageUrl + element1.backdrop_path;
                            slides.push(element1);
                        }
                    });
                });

            vm.slides = slides;
        }

        init();

        function slide(dir) {
            $('#myCarousel').carousel(dir);
        };
    }

})();