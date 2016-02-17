(function(){

    $(init);

    var $results;
    var popularMovieUrl = "http://api.themoviedb.org/3/discover/movie?api_key=0989313de69b690eda213c2c6387e038&sort_by=popularity.desc&language=en";
    var imageUrl = "http://image.tmdb.org/t/p/original/IMAGEPATH";

    function init() {
        $results = $(".results");
        popularMovies();
    }

    function popularMovies() {
        $.ajax({
            url: popularMovieUrl,
            success: renderPopularMovieList
        });
    }

    function renderPopularMovieList(response) {
        $results.empty();

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
                var poster = imageUrl
                    .replace("IMAGEPATH", poster_path);

                var $div1 = $("<div>");
                $div1.addClass("col-sm-6 col-md-4");

                var $div2 = $("<div>");
                $div2.addClass("thumbnail");

                var $img = $("<img>")
                    .attr("src", poster)
                    .attr("id", id)
                    .addClass("img-responsive")
                    .click(searchMovieDetails);

                var $div3 = $("<div>");
                $div3.addClass("caption");

                var $h3 = $("<h3>");
                $h3.append(title);

                $div3.append($h3);
                $div2.append($img).append($div3);
                $div1.append($div2);
                $div1.append($div1);

                $results.append($div1);
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