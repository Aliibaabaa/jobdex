// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "./ReputationSystem.sol";
import "./TokenManagement.sol";
import "./UserRegistry.sol";

contract JobListing {
    // Add instances of the contracts
    ReputationSystem reputationSystem;
    TokenManagement tokenManagement;
    UserRegistry userRegistry;

    // Struct to store data about a job listing
    struct Job {
        uint id; // Unique identifier for the job listing
        address employer; // Address of the employer who posted the job
        string title; // Job title
        string description; // Job description
        string requiredSkills; // Required skills for the job
        uint experience; // Required experience level
        uint compensation; // Compensation offered for the job
        bool isActive; // Status of the job: true if active, false otherwise
    }

    // Counter to keep track of the total number of job listings
    uint private jobCounter;

    // Mapping to store job listings by their unique identifier
    mapping(uint => Job) private jobs;

    // Event emitted when a new job listing is posted
    event JobPosted(
        uint indexed jobId,
        address indexed employer,
        string title,
        string description,
        string requiredSkills,
        uint experience,
        uint compensation
    );

    // Event emitted when a job listing is updated
    event JobUpdated(
        uint indexed jobId,
        string title,
        string description,
        string requiredSkills,
        uint experience,
        uint compensation
    );

    // Event emitted when a job listing is removed
    event JobRemoved(uint indexed jobId);

    // Add constructor to receive the addresses of the required contracts
    constructor(
        address _reputationSystem,
        address _tokenManagement,
        address _userRegistry
    ) {
        reputationSystem = ReputationSystem(_reputationSystem);
        tokenManagement = TokenManagement(_tokenManagement);
        userRegistry = UserRegistry(_userRegistry);
    }

    // Function to post a new job listing
    function postJob(
        string memory _title,
        string memory _description,
        string memory _requiredSkills,
        uint _experience,
        uint _compensation
    ) public {
        jobCounter++;

        // Create a new Job struct and store it in the jobs mapping
        Job memory newJob = Job(
            jobCounter,
            msg.sender,
            _title,
            _description,
            _requiredSkills,
            _experience,
            _compensation,
            true
        );
        jobs[jobCounter] = newJob;

        // Emit the JobPosted event
        emit JobPosted(
            jobCounter,
            msg.sender,
            _title,
            _description,
            _requiredSkills,
            _experience,
            _compensation
        );
    }

    // Function to update an existing job listing
    function updateJob(
        uint _jobId,
        string memory _title,
        string memory _description,
        string memory _requiredSkills,
        uint _experience,
        uint _compensation
    ) public {
        Job storage job = jobs[_jobId];

        // Ensure that only the employer can update the job listing
        require(
            job.employer == msg.sender,
            "Only the job employer can update the job"
        );
        // Ensure that the job listing is still active
        require(job.isActive, "Job is not active");

        // Update the job details
        job.title = _title;
        job.description = _description;
        job.requiredSkills = _requiredSkills;
        job.experience = _experience;
        job.compensation = _compensation;

        // Emit the JobUpdated event
        emit JobUpdated(
            _jobId,
            _title,
            _description,
            _requiredSkills,
            _experience,
            _compensation
        );
    }

    // Function to remove a job listing
    function removeJob(uint _jobId) public {
        Job storage job = jobs[_jobId];

        // Ensure that only the employer can remove the job listing
        require(
            job.employer == msg.sender,
            "Only the job employer can remove the job"
        );
        // Ensure that the job listing is still active
        require(job.isActive, "Job is not active");
        // Set the job listing status to inactive
        job.isActive = false;

        // Emit the JobRemoved event
        emit JobRemoved(_jobId);
    }

    // Function to retrieve a job listing by its ID
    function getJob(uint _jobId) public view returns (Job memory) {
        return jobs[_jobId];
    }

    // Function to retrieve all active job listings
    function getAllJobs() public view returns (Job[] memory) {
        // Count the number of active jobs
        uint activeJobsCount = 0;
        for (uint i = 1; i <= jobCounter; i++) {
            if (jobs[i].isActive) {
                activeJobsCount++;
            }
        }

        // Create an array to store the active Job structs
        Job[] memory allJobs = new Job[](activeJobsCount);

        // Iterate through the jobs mapping and add active jobs to the array
        uint index = 0;
        for (uint i = 1; i <= jobCounter; i++) {
            if (jobs[i].isActive) {
                allJobs[index] = jobs[i];
                index++;
            }
        }

        // Return the array of active Job structs
        return allJobs;
    }

    // Complete job function
    function completeJob(
        uint jobId,
        uint reviewRating,
        string memory reviewComment
    ) public {
        // Fetch job and user information
        Job memory job = getJob(jobId);
        UserRegistry.User memory jobSeeker = userRegistry.getUserById(job.id);
        UserRegistry.User memory employer = userRegistry.getUserByAddress(
            job.employer
        );

        require(job.isActive, "Job is not active");
        require(
            employer.userType == UserRegistry.UserType.Employer,
            "Only an employer can complete a job"
        );
        require(
            jobSeeker.userType == UserRegistry.UserType.JobSeeker,
            "Job must be assigned to a job seeker"
        );

        // Transfer tokens from employer to job seeker
        tokenManagement.transferFrom(
            employer.wallet,
            jobSeeker.wallet,
            job.compensation
        );

        // Update reputation of job seeker
        reputationSystem.submitReview(
            jobSeeker.id,
            ReputationSystem.ReviewType.JobSeeker,
            reviewRating,
            reviewComment
        );

        // Set job as inactive
        job.isActive = false;
    }
}
