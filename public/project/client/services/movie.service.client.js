(function () {

    angular
        .module("MovieTimeApp")
        .factory("MovieService", MovieService);


    function MovieService($http) {
        var popularMovieUrl = "http://api.themoviedb.org/3/discover/movie?api_key=0989313de69b690eda213c2c6387e038&sort_by=popularity.desc&language=en";
        var genreListUrl = "http://api.themoviedb.org/3/genre/movie/list?api_key=0989313de69b690eda213c2c6387e038&language=en";
        var searchUrl = "http://api.themoviedb.org/3/search/movie?api_key=0989313de69b690eda213c2c6387e038&language=en&query=TITLE&page=PAGE";
        var detailsUrl = "http://api.themoviedb.org/3/movie/ID?api_key=0989313de69b690eda213c2c6387e038&language=en";
        var imageUrl = "http://image.tmdb.org/t/p/original/";

        var api = {
            findPopularMovies: findPopularMovies,
            getGenreList: getGenreList,
            getImageURL: getImageURL,
            getMoviesByTitle: getMoviesByTitle,
            getMovieDetailsById: getMovieDetailsById,
            addMovie: addMovie
        };
        return api;

        function findPopularMovies(callback) {
            $http.get(popularMovieUrl)
                .success(callback);
        }

        function getGenreList(callback) {
            $http.get(genreListUrl)
                .success(callback);
        }

        function getImageURL(callback) {
            callback(imageUrl);
        }

        function getMoviesByTitle(movieTitle, callback) {
            var url = searchUrl
                .replace("TITLE", movieTitle)
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

        function addMovie(movie) {
            return $http.post("/api/project/movie", movie);
        }
    }
})();