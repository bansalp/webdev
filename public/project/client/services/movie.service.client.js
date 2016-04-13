(function () {

    angular
        .module("MovieTimeApp")
        .factory("MovieService", MovieService);


    function MovieService($http) {
        var popularMovieUrl = "http://api.themoviedb.org/3/discover/movie?api_key=0989313de69b690eda213c2c6387e038&sort_by=popularity.desc&language=en";
        var genreListUrl = "http://api.themoviedb.org/3/genre/movie/list?api_key=0989313de69b690eda213c2c6387e038&language=en";
        var creditsUrl = "http://api.themoviedb.org/3/movie/MOVIEID/credits?api_key=0989313de69b690eda213c2c6387e038&language=en";
        var videoUrl = "http://api.themoviedb.org/3/movie/MOVIEID/videos?api_key=0989313de69b690eda213c2c6387e038&language=en";
        var youtubeEmbedUrl = "https://www.youtube.com/embed/KEY";
        var similarUrl = "http://api.themoviedb.org/3/movie/MOVIEID/similar?api_key=0989313de69b690eda213c2c6387e038&language=en";
        var reviewsUrl = "http://api.themoviedb.org/3/movie/MOVIEID/reviews?api_key=0989313de69b690eda213c2c6387e038&language=en";
        var upcomingUrl = "http://api.themoviedb.org/3/movie/upcoming?api_key=0989313de69b690eda213c2c6387e038&language=en";
        var nowplayingUrl = "http://api.themoviedb.org/3/movie/now_playing?api_key=0989313de69b690eda213c2c6387e038&language=en";
        var topratedUrl = "http://api.themoviedb.org/3/movie/top_rated?api_key=0989313de69b690eda213c2c6387e038&language=en";
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

        function findPopularMovies() {
            return $http.get(popularMovieUrl);
        }

        function getGenreList() {
            return $http.get(genreListUrl);
        }

        function getImageURL() {
            return imageUrl;
        }

        function getMoviesByTitle(movieTitle) {
            var url = searchUrl
                .replace("TITLE", movieTitle)
                .replace("PAGE", 1);
            return $http.get(url);
        }

        function getMovieDetailsById(movieId) {
            var url = detailsUrl
                .replace("ID", movieId);
            return $http.get(url);
        }

        function addMovie(movie) {
            return $http.post("/api/project/movie", movie);
        }
    }
})();