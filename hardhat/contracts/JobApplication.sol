// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

contract JobApplication {
    struct Application {
        uint id;
        uint jobId;
        address applicant;
        string coverLetter;
        uint256 timestamp;
        bool isWithdrawn;
    }

    uint private applicationCounter;
    mapping(uint => Application) private applications;
    mapping(uint => uint[]) private jobApplications;
    mapping(address => uint[]) private userApplications;

    event ApplicationSubmitted(
        uint indexed applicationId,
        uint indexed jobId,
        address indexed applicant,
        string coverLetter,
        uint256 timestamp
    );
    event ApplicationWithdrawn(uint indexed applicationId);

    function submitApplication(uint _jobId, string memory _coverLetter) public {
        applicationCounter++;

        Application memory newApplication = Application(
            applicationCounter,
            _jobId,
            msg.sender,
            _coverLetter,
            block.timestamp,
            false
        );
        applications[applicationCounter] = newApplication;
        jobApplications[_jobId].push(applicationCounter);
        userApplications[msg.sender].push(applicationCounter);

        emit ApplicationSubmitted(
            applicationCounter,
            _jobId,
            msg.sender,
            _coverLetter,
            block.timestamp
        );
    }

    function withdrawApplication(uint _applicationId) public {
        Application storage application = applications[_applicationId];

        require(
            application.applicant == msg.sender,
            "Only the applicant can withdraw the application"
        );
        require(!application.isWithdrawn, "Application is already withdrawn");

        application.isWithdrawn = true;

        emit ApplicationWithdrawn(_applicationId);
    }

    function getApplication(
        uint _applicationId
    ) public view returns (Application memory) {
        return applications[_applicationId];
    }

    function getApplicationsByJob(
        uint _jobId
    ) public view returns (Application[] memory) {
        uint[] memory jobAppIds = jobApplications[_jobId];
        Application[] memory jobApps = new Application[](jobAppIds.length);

        for (uint i = 0; i < jobAppIds.length; i++) {
            jobApps[i] = applications[jobAppIds[i]];
        }

        return jobApps;
    }

    function getApplicationsByUser(
        address _applicant
    ) public view returns (Application[] memory) {
        uint[] memory userAppIds = userApplications[_applicant];
        Application[] memory userApps = new Application[](userAppIds.length);

        for (uint i = 0; i < userAppIds.length; i++) {
            userApps[i] = applications[userAppIds[i]];
        }

        return userApps;
    }
}
