(function(){

    $(init);

    var $movieTitleTxt;
    var $searchMovieBtn;
    var $h3PageHeader;
    var $results;
    var searchUrl = "http://api.themoviedb.org/3/search/movie?api_key=0989313de69b690eda213c2c6387e038&language=en&query=TITLE&page=PAGE";
    var popularMovieUrl = "http://api.themoviedb.org/3/discover/movie?api_key=0989313de69b690eda213c2c6387e038&sort_by=popularity.desc&language=en";
    var imageUrl = "http://image.tmdb.org/t/p/original/IMAGEPATH";

    function init() {
        $movieTitleTxt = $("#movieTitleTxt");
        $searchMovieBtn = $("#searchMovieBtn");
        $h3PageHeader = $(".h3-page-header");
        $results = $(".results");
        $searchMovieBtn.click(searchMovie);
        popularMovies();
    }

    function searchMovie() {
        $h3PageHeader.html("Search Results")
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
        $results.empty();

        var movies = response.results;

        var m;
        for (m in movies) {
            addMovie(movies, m);
        }
    }

    function popularMovies() {
        $h3PageHeader.html("Popular Movies")

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
                addMovie(movies, m);
            }
            else {
                break;
            }
        }
    }

    function addMovie(movies, m) {
        var movie = movies[m];

        var title = movie.title;
        var id = movie.id;
        var image_path = movie.backdrop_path;
        var image = imageUrl
            .replace("IMAGEPATH", image_path);

        var $div1 = $("<div>");
        $div1.addClass("col-sm-6 col-md-4");

        var $div2 = $("<div>");
        $div2.addClass("thumbnail");

        var $img = $("<img>")
            .attr("src", image)
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

    function searchMovieDetails (event) {
        var img = $(event.currentTarget);
        var id = img.attr("id");
        alert(id);
    }

})();