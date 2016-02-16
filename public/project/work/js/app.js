(function(){

    $(init);

    var $popularMovieTemplate;
    var $movieTemplateOuter;
    var searchUrl = "http://api.themoviedb.org/3/discover/movie?api_key=0989313de69b690eda213c2c6387e038&sort_by=popularity.desc&language=en";
    var posterUrl = "http://image.tmdb.org/t/p/original/POSTERPATH";
    var detailsUrl = "http://www.myapifilms.com/imdb/idIMDB?token=5b32d235-4c1e-4639-af25-544d6bff4d0c&format=json&language=en-us&actors=1&awards=1&idIMDB=IMDBID";

    function init() {
        $popularMovieTemplate = $(".popular-movie-template");
        $movieTemplateOuter = $(".movie-template-outer").clone();
        searchMovie();
    }

    function searchMovie() {
        $.ajax({
            url: searchUrl,
            success: renderMovieList
        });
    }

    function renderMovieList(response) {
        $popularMovieTemplate.empty();

        var movies = response.results;

        var m;
        var n = 0;
        for (m in movies) {
            if (n < 18) {
                n = n + 1;

                var movie = movies[m];

                var title = movie.title;
                var id = movie.id;
                var poster_path = movie.poster_path;
                var poster = posterUrl
                    .replace("POSTERPATH", poster_path);

                var $mto = $movieTemplateOuter.clone();
                $mto.find(".movie-title")
                    .html(title);
                $mto.find(".movie-backdrop")
                    .attr("src", poster)
                    .attr("id", id)
                    .click(searchMovieDetails);

                $popularMovieTemplate.append($mto);
            }
            else {
                break;
            }
        }
    }

    function searchMovieDetails (event) {
        var img = $(event.currentTarget);
        var id = img.attr("id");
        alert(id);
    }

})();