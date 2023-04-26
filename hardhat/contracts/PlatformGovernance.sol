// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

// Import the Ownable contract to restrict access to certain functions
import "@openzeppelin/contracts/access/Ownable.sol";
// Import the TimelockController contract for managing governance proposals
import "@openzeppelin/contracts/governance/TimelockController.sol";

contract PlatformGovernance is Ownable {
    // Declare the TimelockController instance
    TimelockController private timelock;

    // Event emitted when a new proposal is created
    event ProposalCreated(
        bytes32 indexed operationId,
        address indexed proposer,
        string description,
        address target,
        bytes data,
        uint256 delay
    );
    // Event emitted when a proposal is executed
    event ProposalExecuted(bytes32 indexed operationId);

    // The constructor sets up the TimelockController with the specified arguments
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

    // Function to create a new proposal
    function createProposal(
        address target,
        bytes memory data,
        uint256 delay,
        string memory description
    ) public onlyOwner returns (bytes32) {
        // Hash the proposal operation to obtain a unique operation ID
        bytes32 operationId = timelock.hashOperation(
            target,
            0,
            data,
            0,
            bytes32(delay)
        );
        // Schedule the proposal with the specified parameters
        timelock.schedule(
            target,
            0,
            data,
            0,
            bytes32(delay),
            uint256(operationId)
        );

        // Emit the ProposalCreated event
        emit ProposalCreated(
            operationId,
            msg.sender,
            description,
            target,
            data,
            delay
        );

        // Return the unique operation ID
        return operationId;
    }

    // Function to execute an approved proposal
    function executeProposal(
        bytes32 operationId,
        address target,
        bytes memory data,
        uint256 delay
    ) public onlyOwner {
        // Execute the proposal using the TimelockController
        timelock.execute(target, 0, data, bytes32(delay), operationId);

        // Emit the ProposalExecuted event
        emit ProposalExecuted(operationId);
    }

    // Function to get the address of the TimelockController instance
    function getTimelockAddress() public view returns (address) {
        return address(timelock);
    }
}
