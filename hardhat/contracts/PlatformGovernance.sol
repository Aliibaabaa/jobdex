// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";

contract PlatformGovernance is Ownable {
    TimelockController private timelock;

    event ProposalCreated(
        bytes32 indexed operationId,
        address indexed proposer,
        string description,
        address target,
        bytes data,
        uint256 delay
    );
    event ProposalExecuted(bytes32 indexed operationId);

    constructor(
        uint256 _minDelay,
        address[] memory proposers,
        address[] memory executors,
        address vetoer
    ) {
        timelock = new TimelockController(
            _minDelay,
            proposers,
            executors,
            vetoer
        );
    }

    function createProposal(
        address target,
        bytes memory data,
        uint256 delay,
        string memory description
    ) public onlyOwner returns (bytes32) {
        bytes32 operationId = timelock.hashOperation(
            target,
            0,
            data,
            0,
            bytes32(delay)
        );
        timelock.schedule(
            target,
            0,
            data,
            0,
            bytes32(delay),
            uint256(operationId)
        );

        emit ProposalCreated(
            operationId,
            msg.sender,
            description,
            target,
            data,
            delay
        );

        return operationId;
    }

    function executeProposal(
        bytes32 operationId,
        address target,
        bytes memory data,
        uint256 delay
    ) public onlyOwner {
        timelock.execute(target, 0, data, bytes32(delay), operationId);

        emit ProposalExecuted(operationId);
    }

    function getTimelockAddress() public view returns (address) {
        return address(timelock);
    }
}
