(function () {

    angular
        .module("MovieTimeApp")
        .factory("MovieService", MovieService);


    function MovieService($http) {
        var popularMovieUrl = "http://api.themoviedb.org/3/discover/movie?api_key=0989313de69b690eda213c2c6387e038&sort_by=popularity.desc&language=en";
        var imageUrl = "http://image.tmdb.org/t/p/original/";

        var api = {
            findPopularMovies: findPopularMovies,
            getImageURL: getImageURL
        };
        return api;

        function findPopularMovies(callback) {
            $http.get(popularMovieUrl)
                .success(callback);
        }

        function getImageURL(callback) {
            callback(imageUrl);
        }
    }
})();