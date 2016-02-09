(function(){

    $(init);

    var $movieTitleTxt;
    var $searchMovieBtn;
    var $tbody;
    var searchUrl = "http://api.themoviedb.org/3/search/movie?api_key=0989313de69b690eda213c2c6387e038&language=en&query=TITLE&page=PAGE";
    var posterUrl = "http://image.tmdb.org/t/p/original/POSTERPATH";
    var detailsUrl = "http://www.myapifilms.com/imdb/idIMDB?token=5b32d235-4c1e-4639-af25-544d6bff4d0c&format=json&language=en-us&actors=1&awards=1&idIMDB=IMDBID";

    function init() {
        $movieTitleTxt = $("#movieTitleTxt");
        $searchMovieBtn = $("#searchMovieBtn");
        $tbody = $("#searchResults tbody");

        $searchMovieBtn.click(searchMovie);
    }

    function searchMovie() {
        var movieTitle = $movieTitleTxt.val();
        var url = searchUrl
            .replace("TITLE", movieTitle)
            .replace("PAGE", 1);

        $.ajax({
            url: url,
            success: renderMovieList
        });
    }

    function renderMovieList(response) {
        $tbody.empty();

        var totalResults = response.total_results;
        var movies = response.results;

        var m;
        for (m in movies) {
            var movie = movies[m];

            var title = movie.title;
            var id = movie.id;
            var poster_path = movie.poster_path;
            var poster = posterUrl
                .replace("POSTERPATH", poster_path);

            var $tr = $("<tr>");

            var $img = $("<img>")
                .attr("src", poster)
                .attr("id", id)
                .addClass("poster thumbnail")
                .click(searchMovieDetails);

            var $td = $("<td>");
            $td.append($img);
            $tr.append($td);

            $td = $("<td>")
                .append(title);
            $tr.append($td);

            $td = $("<td>")
                .append(id);
            $tr.append($td);

            $tbody.append($tr);
        }
    }

    function searchMovieDetails (event) {
        var img = $(event.currentTarget);
        var id = img.attr("id");

        alert(id);

        /*var url = detailsUrl
            .replace("IMDBID", id);

        $.ajax({
            url: url,
            dataType: "jsonp",
            success: renderMovieDetailsList
        });*/
    }

    function renderMovieDetailsList(response) {
        var movie = response.data.movies[0];

        var actors = movie.actors;
        var directors = movie.directors;
        var plot = movie.plot;
        var title = movie.title;
        var poster = movie.urlPoster;

        console.log(movie);
    }

})();