(function () {

    angular
        .module("MovieTimeApp")
        .factory("ReviewService", ReviewService);


    function ReviewService() {
        var reviews = [
            {
                "reviewId": 1,
                "title": "Lorem Ipsum 1",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "timestamp": "August 25, 2014 at 9:30 PM",
                "movieId": 293660,
                "userId": 1
            },
            {
                "reviewId": 2,
                "title": "Lorem Ipsum 2",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "timestamp": "August 26, 2014 at 9:30 PM",
                "movieId": 293660,
                "userId": 2
            }
        ];

        var api = {
            findAllReviewsByMovieId: findAllReviewsByMovieId
        };
        return api;

        function findAllReviewsByMovieId(movieId, callback) {
            var result = [];
            for (var i = 0; i < reviews.length; i++) {
                if (reviews[i].movieId === movieId) {
                    result.push(reviews[i]);
                }
            }
            callback(result.length === 0 ? null : result);
        }
    }

})();