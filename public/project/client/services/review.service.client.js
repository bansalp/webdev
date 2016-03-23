(function () {

    angular
        .module("MovieTimeApp")
        .factory("ReviewService", ReviewService);


    function ReviewService(UserService) {
        var reviews = [
            {
                "_id": 1,
                "title": "Lorem Ipsum 1",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "timestamp": "Mar 10, 2016",
                "movieId": 293660,
                "userId": 123,
                "rating": 2.5,
                "commentIds": [1, 2, 3]
            },
            {
                "_id": 2,
                "title": "Lorem Ipsum 2",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "timestamp": "Mar 10, 2016",
                "movieId": 293660,
                "userId": 234,
                "rating": 4,
                "commentIds": [4, 5]
            },
            {
                "_id": 3,
                "title": "Lorem Ipsum 3",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "timestamp": "Mar 10, 2016",
                "movieId": 76341,
                "userId": 345,
                "rating": 1,
                "commentIds": []
            }
        ];

        var api = {
            findAllReviewsByMovieId: findAllReviewsByMovieId,
            getMovieAvgRatingById: getMovieAvgRatingById,
            addReview: addReview,
            updateReview: updateReview,
            deleteReview: deleteReview
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

        function getMovieAvgRatingById(movieId, callback) {
            var result = [];
            for (var i = 0; i < reviews.length; i++) {
                if (reviews[i].movieId === movieId) {
                    result.push(reviews[i]);
                }
            }

            var avgRating = 0;
            for (var i = 0; i < result.length; i++) {
                avgRating += result[i].rating;
            }

            callback(avgRating / result.length);
        }

        function addReview(review, movieId, callback) {
            var id = (new Date).getTime();
            var newReview = {
                "_id": id,
                "title": review.title,
                "description": review.description,
                "timestamp": new Date(),
                "movieId": movieId,
                "userId": UserService.getCurrentUser()._id,
                "rating": review.rating,
                "commentIds": []
            };
            reviews.push(newReview);
            callback();
        }

        function updateReview(review, callback) {
            var reviewIndex = findReviewIndexByReviewId(review._id);
            reviews[reviewIndex] = {
                "_id": review._id,
                "title": review.title,
                "description": review.description,
                "timestamp": new Date(),
                "movieId": review.movieId,
                "userId": review.userId,
                "rating": review.rating,
                "commentIds": review.commentIds
            };
            callback(reviews[reviewIndex]);
        }

        function deleteReview(reviewId, callback) {
            var reviewIndex = findReviewIndexByReviewId(reviewId);
            reviews.splice(reviewIndex, 1);
            callback();
        }

        function findReviewIndexByReviewId(reviewId) {
            var index = 0;
            for (var i = 0; i < reviews.length; i++) {
                if (reviews[i]._id === reviewId) {
                    return index;
                }
                index++;
            }
        }
    }

})();