// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

contract DisputeResolution {
    enum DisputeStatus {
        Created,
        Resolved,
        Rejected
    }

    struct Dispute {
        uint id;
        uint jobId;
        address complainant;
        address respondent;
        string reason;
        DisputeStatus status;
        uint256 timestamp;
    }

    uint private disputeCounter;
    mapping(uint => Dispute) private disputes;

    event DisputeCreated(
        uint indexed disputeId,
        uint indexed jobId,
        address indexed complainant,
        address respondent,
        string reason,
        uint256 timestamp
    );
    event DisputeResolved(uint indexed disputeId);
    event DisputeRejected(uint indexed disputeId);

    function createDispute(
        uint _jobId,
        address _respondent,
        string memory _reason
    ) public {
        disputeCounter++;

        Dispute memory newDispute = Dispute(
            disputeCounter,
            _jobId,
            msg.sender,
            _respondent,
            _reason,
            DisputeStatus.Created,
            block.timestamp
        );
        disputes[disputeCounter] = newDispute;

        emit DisputeCreated(
            disputeCounter,
            _jobId,
            msg.sender,
            _respondent,
            _reason,
            block.timestamp
        );
    }

    function resolveDispute(uint _disputeId) public {
        Dispute storage dispute = disputes[_disputeId];

        require(
            dispute.status == DisputeStatus.Created,
            "Dispute already resolved or rejected"
        );

        dispute.status = DisputeStatus.Resolved;

        emit DisputeResolved(_disputeId);
    }

    function rejectDispute(uint _disputeId) public {
        Dispute storage dispute = disputes[_disputeId];

        require(
            dispute.status == DisputeStatus.Created,
            "Dispute already resolved or rejected"
        );

        dispute.status = DisputeStatus.Rejected;

        emit DisputeRejected(_disputeId);
    }

    function getDispute(uint _disputeId) public view returns (Dispute memory) {
        return disputes[_disputeId];
    }
}
