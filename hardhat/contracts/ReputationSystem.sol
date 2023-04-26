// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

contract ReputationSystem {
    enum ReviewType {
        Employer,
        JobSeeker
    }

    struct Review {
        uint id;
        uint targetUserId;
        ReviewType reviewType;
        address reviewer;
        uint rating;
        string comment;
        uint256 timestamp;
    }

    uint private reviewCounter;
    mapping(uint => Review) private reviews;
    mapping(uint => uint[]) private userReviews;

    event ReviewSubmitted(
        uint indexed reviewId,
        uint indexed targetUserId,
        ReviewType reviewType,
        address indexed reviewer,
        uint rating,
        string comment,
        uint256 timestamp
    );

    function submitReview(
        uint _targetUserId,
        ReviewType _reviewType,
        uint _rating,
        string memory _comment
    ) public {
        require(
            _rating >= 1 && _rating <= 5,
            "Rating should be between 1 and 5"
        );

        reviewCounter++;

        Review memory newReview = Review(
            reviewCounter,
            _targetUserId,
            _reviewType,
            msg.sender,
            _rating,
            _comment,
            block.timestamp
        );
        reviews[reviewCounter] = newReview;
        userReviews[_targetUserId].push(reviewCounter);

        emit ReviewSubmitted(
            reviewCounter,
            _targetUserId,
            _reviewType,
            msg.sender,
            _rating,
            _comment,
            block.timestamp
        );
    }

    function getReview(uint _reviewId) public view returns (Review memory) {
        return reviews[_reviewId];
    }

    function getReviewsByUser(
        uint _targetUserId
    ) public view returns (Review[] memory) {
        uint[] memory userRevIds = userReviews[_targetUserId];
        Review[] memory userRevs = new Review[](userRevIds.length);

        for (uint i = 0; i < userRevIds.length; i++) {
            userRevs[i] = reviews[userRevIds[i]];
        }

        return userRevs;
    }

    function getUserReputation(uint _targetUserId) public view returns (uint) {
        uint[] memory userRevIds = userReviews[_targetUserId];

        if (userRevIds.length == 0) {
            return 0;
        }

        uint totalRating = 0;

        for (uint i = 0; i < userRevIds.length; i++) {
            totalRating += reviews[userRevIds[i]].rating;
        }

        return totalRating / userRevIds.length;
    }
}
