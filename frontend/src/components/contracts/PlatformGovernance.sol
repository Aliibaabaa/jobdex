// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the Ownable contract to restrict access to certain functions
import "@openzeppelin/contracts/access/Ownable.sol";
// Import the TimelockController contract for managing governance proposals
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "./TokenManagement.sol";

contract PlatformGovernance is Ownable {
    // Declare the TimelockController instance
    TimelockController private timelock;

    // Add an instance of the TokenManagement contract
    TokenManagement private tokenManagement;

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
        address vetoer,
        address _tokenManagement
    ) {
        timelock = new TimelockController(
            _minDelay,
            proposers,
            executors,
            vetoer
        );

        tokenManagement = TokenManagement(_tokenManagement);
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

    // Add mint, burn and transfer functions that interact with TokenManagement contract
    function mintTokens(address to, uint256 amount) public onlyOwner {
        require(
            timelock.isOperationPending(
                keccak256(abi.encodePacked("mint", to, amount))
            ),
            "Operation not approved"
        );
        tokenManagement.mint(to, amount);
    }

    function burnTokens(address from, uint256 amount) public onlyOwner {
        require(
            timelock.isOperationPending(
                keccak256(abi.encodePacked("burn", from, amount))
            ),
            "Operation not approved"
        );
        tokenManagement.burn(from, amount);
    }

    function transferTokens(
        address from,
        address to,
        uint256 amount
    ) public onlyOwner {
        require(
            timelock.isOperationPending(
                keccak256(abi.encodePacked("transfer", from, to, amount))
            ),
            "Operation not approved"
        );
        tokenManagement.transferFrom(from, to, amount);
    }
}
