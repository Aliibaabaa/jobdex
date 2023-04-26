// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";

contract PlatformGovernance is Ownable {
    TimelockController private timelock;

    event ProposalCreated(
        uint indexed proposalId,
        address indexed proposer,
        string description,
        address target,
        bytes data,
        uint256 delay
    );
    event ProposalExecuted(uint indexed proposalId);

    constructor(
        uint256 _minDelay,
        address[] memory proposers,
        address[] memory executors
    ) {
        timelock = new TimelockController(_minDelay, proposers, executors);
    }

    function createProposal(
        address target,
        bytes memory data,
        uint256 delay,
        string memory description
    ) public onlyOwner returns (uint) {
        bytes32 operationId = timelock.hashOperation(target, 0, data, 0, delay);
        timelock.schedule(target, 0, data, 0, delay, operationId);

        uint proposalId = uint(
            keccak256(abi.encodePacked(block.timestamp, operationId))
        );

        emit ProposalCreated(
            proposalId,
            msg.sender,
            description,
            target,
            data,
            delay
        );

        return proposalId;
    }

    function executeProposal(
        uint proposalId,
        address target,
        bytes memory data,
        uint256 delay
    ) public onlyOwner {
        bytes32 operationId = timelock.hashOperation(target, 0, data, 0, delay);
        timelock.execute(target, 0, data, 0, delay, operationId);

        emit ProposalExecuted(proposalId);
    }

    function getTimelockAddress() public view returns (address) {
        return address(timelock);
    }
}
