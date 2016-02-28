(function () {

    angular
        .module("MovieTimeApp")
        .factory("MovieService", MovieService);


    function MovieService($http) {
        var popularMovieUrl = "http://api.themoviedb.org/3/discover/movie?api_key=0989313de69b690eda213c2c6387e038&sort_by=popularity.desc&language=en";
        var searchUrl = "http://api.themoviedb.org/3/search/movie?api_key=0989313de69b690eda213c2c6387e038&language=en&query=TITLE&page=PAGE";
        var detailsUrl = "http://api.themoviedb.org/3/movie/ID?api_key=0989313de69b690eda213c2c6387e038&language=en";
        var imageUrl = "http://image.tmdb.org/t/p/original/";

        var api = {
            findPopularMovies: findPopularMovies,
            getImageURL: getImageURL,
            getMoviesByTitle: getMoviesByTitle,
            getMovieDetailsById: getMovieDetailsById
        };
        return api;

        function findPopularMovies(callback) {
            $http.get(popularMovieUrl)
                .success(callback);
        }

        function getImageURL(callback) {
            callback(imageUrl);
        }

        function getMoviesByTitle(movie, callback) {
            var url = searchUrl
                .replace("TITLE", movie.title)
                .replace("PAGE", 1);
            $http.get(url)
                .success(callback);
        }

        function getMovieDetailsById(movieId, callback) {
            var url = detailsUrl
                .replace("ID", movieId);
            $http.get(url)
                .success(callback);
        }
    }
})();