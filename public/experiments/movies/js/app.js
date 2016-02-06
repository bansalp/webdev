(function(){

    $(init);

    var $movieTitleTxt;
    var $searchMovieBtn;
    var $tbody;
    var searchUrl = "http://www.omdbapi.com/?s=TITLE&page=PAGE";
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

        var totalResults = response.totalResults;
        var movies = response.Search;

        var m;
        for (m in movies) {
            var movie = movies[m];

            var title = movie.Title;
            var imdbId = movie.imdbID;
            var poster = movie.Poster;

            var $tr = $("<tr>");

            var $img = $("<img>")
                .attr("src", poster)
                .attr("id", imdbId)
                .addClass("poster thumbnail")
                .click(searchMovieDetails);

            var $td = $("<td>");
            $td.append($img);
            $tr.append($td);

            $td = $("<td>")
                .append(title);
            $tr.append($td);

            $td = $("<td>")
                .append(imdbId);
            $tr.append($td);

            $tbody.append($tr);
        }
    }

    function searchMovieDetails (event) {
        var img = $(event.currentTarget);
        var imdbId = img.attr("id");

        var url = detailsUrl
            .replace("IMDBID", imdbId);

        $.ajax({
            url: url,
            dataType: "jsonp",
            success: renderMovieDetailsList
        });
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