// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

contract JobListing {
    struct Job {
        uint id;
        address employer;
        string title;
        string description;
        string requiredSkills;
        uint experience;
        uint compensation;
        bool isActive;
    }

    uint private jobCounter;
    mapping(uint => Job) private jobs;

    event JobPosted(
        uint indexed jobId,
        address indexed employer,
        string title,
        string description,
        string requiredSkills,
        uint experience,
        uint compensation
    );
    event JobUpdated(
        uint indexed jobId,
        string title,
        string description,
        string requiredSkills,
        uint experience,
        uint compensation
    );
    event JobRemoved(uint indexed jobId);

    function postJob(
        string memory _title,
        string memory _description,
        string memory _requiredSkills,
        uint _experience,
        uint _compensation
    ) public {
        jobCounter++;

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

    function updateJob(
        uint _jobId,
        string memory _title,
        string memory _description,
        string memory _requiredSkills,
        uint _experience,
        uint _compensation
    ) public {
        Job storage job = jobs[_jobId];

        require(
            job.employer == msg.sender,
            "Only the job employer can update the job"
        );
        require(job.isActive, "Job is not active");

        job.title = _title;
        job.description = _description;
        job.requiredSkills = _requiredSkills;
        job.experience = _experience;
        job.compensation = _compensation;

        emit JobUpdated(
            _jobId,
            _title,
            _description,
            _requiredSkills,
            _experience,
            _compensation
        );
    }

    function removeJob(uint _jobId) public {
        Job storage job = jobs[_jobId];

        require(
            job.employer == msg.sender,
            "Only the job employer can remove the job"
        );
        require(job.isActive, "Job is not active");

        job.isActive = false;

        emit JobRemoved(_jobId);
    }

    function getJob(uint _jobId) public view returns (Job memory) {
        return jobs[_jobId];
    }

    function getAllJobs() public view returns (Job[] memory) {
        uint activeJobsCount = 0;
        for (uint i = 1; i <= jobCounter; i++) {
            if (jobs[i].isActive) {
                activeJobsCount++;
            }
        }

        Job[] memory allJobs = new Job[](activeJobsCount);
        uint index = 0;
        for (uint i = 1; i <= jobCounter; i++) {
            if (jobs[i].isActive) {
                allJobs[index] = jobs[i];
                index++;
            }
        }

        return allJobs;
    }
}
