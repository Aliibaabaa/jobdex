// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "./UserRegistry.sol";

contract ReputationSystem {
    // Add an instance of the UserRegistry contract
    UserRegistry userRegistry;

    // Enum to define the type of review: Employer or JobSeeker
    enum ReviewType {
        Employer,
        JobSeeker
    }

    // Struct to store review data
    struct Review {
        uint id;
        uint targetUserId;
        ReviewType reviewType;
        address reviewer;
        uint rating;
        string comment;
        uint256 timestamp;
    }

    // Counter to keep track of the number of reviews
    uint private reviewCounter;
    // Mapping to store reviews by their ID
    mapping(uint => Review) private reviews;
    // Mapping to store user reviews by their target user ID
    mapping(uint => uint[]) private userReviews;

    // Event emitted when a new review is submitted
    event ReviewSubmitted(
        uint indexed reviewId,
        uint indexed targetUserId,
        ReviewType reviewType,
        address indexed reviewer,
        uint rating,
        string comment,
        uint256 timestamp
    );

    // Add constructor to receive the address of the UserRegistry contract
    constructor(address _userRegistry) {
        userRegistry = UserRegistry(_userRegistry);
    }

    // Function to submit a new review
    function submitReview(
        uint _targetUserId,
        ReviewType _reviewType,
        uint _rating,
        string memory _comment
    ) public {
        // Check if the target user is registered
        require(
            userRegistry.isUserRegistered(
                userRegistry.getUserById(_targetUserId).wallet
            ),
            "User not registered"
        );

        // Ensure the rating is between 1 and 5
        require(
            _rating >= 1 && _rating <= 5,
            "Rating should be between 1 and 5"
        );

        // Increment the review counter
        reviewCounter++;

        // Create a new review with the given parameters
        Review memory newReview = Review(
            reviewCounter,
            _targetUserId,
            _reviewType,
            msg.sender,
            _rating,
            _comment,
            block.timestamp
        );
        // Store the review in the mapping
        reviews[reviewCounter] = newReview;
        // Add the review ID to the user's list of reviews
        userReviews[_targetUserId].push(reviewCounter);

        // Emit the ReviewSubmitted event
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

    // Function to get a review by its ID
    function getReview(uint _reviewId) public view returns (Review memory) {
        return reviews[_reviewId];
    }

    // Function to get all reviews for a specific user
    function getReviewsByUser(
        uint _targetUserId
    ) public view returns (Review[] memory) {
        // Get the list of review IDs for the target user
        uint[] memory userRevIds = userReviews[_targetUserId];
        // Create an array to store the user's reviews
        Review[] memory userRevs = new Review[](userRevIds.length);

        // Iterate through the user's review IDs and store the reviews in the array
        for (uint i = 0; i < userRevIds.length; i++) {
            userRevs[i] = reviews[userRevIds[i]];
        }

        // Return the array of user reviews
        return userRevs;
    }

    // Function to calculate the user's reputation based on their reviews
    function getUserReputation(uint _targetUserId) public view returns (uint) {
        // Get the list of review IDs for the target user
        uint[] memory userRevIds = userReviews[_targetUserId];

        // If there are no reviews, return 0
        if (userRevIds.length == 0) {
            return 0;
        }

        // Calculate the total rating
        uint totalRating = 0;

        // Iterate through the user's review IDs and sum the ratings
        for (uint i = 0; i < userRevIds.length; i++) {
            totalRating += reviews[userRevIds[i]].rating;
        }

        // Calculate the average rating by dividing the total rating by the number of reviews
        return totalRating / userRevIds.length;
    }
}
