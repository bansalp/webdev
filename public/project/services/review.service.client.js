(function () {

    angular
        .module("MovieTimeApp")
        .factory("ReviewService", ReviewService);


    function ReviewService(CommentService) {
        var reviews = [
            {
                "_id": 1,
                "title": "Lorem Ipsum 1",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "timestamp": "August 25, 2014 at 9:30 PM",
                "movieId": 293660,
                "userId": 1,
                "commentIds": [1, 2, 3]
            },
            {
                "_id": 2,
                "title": "Lorem Ipsum 2",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "timestamp": "August 26, 2014 at 9:30 PM",
                "movieId": 293660,
                "userId": 2,
                "commentIds": [4, 5]
            },
            {
                "_id": 3,
                "title": "Lorem Ipsum 3",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "timestamp": "August 27, 2014 at 9:30 PM",
                "movieId": 76341,
                "userId": 3,
                "commentIds": []
            }
        ];

        var api = {
            findAllReviewsByMovieId: findAllReviewsByMovieId,
            findAllCommentsByMovieId: findAllCommentsByMovieId,
            addReview: addReview
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

        function findAllCommentsByMovieId(movieId, callback) {
            var reviewIds = [];
            for (var i = 0; i < reviews.length; i++) {
                if (reviews[i].movieId === movieId) {
                    reviewIds.push(reviews[i]._id);
                }
            }

            callback(reviewIds.length === 0 ? null : findAllCommentsByReviewIds(reviewIds));
        }

        function findAllCommentsByReviewIds(reviewIds) {
            var result = [];
            for (var i = 0; i < reviewIds.length; i++) {
                CommentService.findAllCommentsByReviewId(reviewIds[i], function (response) {
                    if (response) {
                        result = result.concat(response);
                    }
                });
            }
            return result;
        }

        function addReview(review, movieId, callback) {
            var id = (new Date).getTime();
            var newReview = {
                "_id": id,
                "title": review.title,
                "description": review.description,
                "timestamp": new Date(),
                "movieId": movieId,
                "userId": 1,
                "commentIds": []
            };
            reviews.push(newReview);
            callback(true);
        }
    }

})();