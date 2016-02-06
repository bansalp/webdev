(function(){

    $(init);

    var $movieTitleTxt;
    var $searchMovieBtn;
    var $tbody;
    var searchUrl = "http://www.omdbapi.com/?s=TITLE&page=PAGE";

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
                .addClass("poster thumbnail");

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

})();