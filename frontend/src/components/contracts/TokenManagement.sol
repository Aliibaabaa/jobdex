// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the ERC20 contract from OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./UserRegistry.sol";

// Define the TokenManagement contract that inherits from the ERC20 contract
contract TokenManagement is ERC20 {
    // Define the owner variable which represents the address of the contract owner
    address public owner; // Define a modifier called onlyOwner, which ensures that only the contract owner can call functions with this modifier
    UserRegistry private userRegistry;

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    // Define the constructor, which takes the initial token supply as an argument
    constructor(
        uint256 initialSupply,
        address _userRegistry
    ) ERC20("DecentralizedJobMarketToken", "DJMT") {
        // Mint the initial token supply and assign it to the contract deployer
        _mint(msg.sender, initialSupply);
        // Set the owner variable to the address of the contract deployer
        owner = msg.sender;

        userRegistry = UserRegistry(_userRegistry);
    }

    // Define the mint function, which allows the contract owner to mint new tokens to a specified address
    function mint(address to, uint256 amount) public onlyOwner {
        // Call the internal _mint function to create new tokens
        _mint(to, amount);
    }

    // Define the burn function, which allows the contract owner to burn tokens from a specified address
    function burn(address from, uint256 amount) public onlyOwner {
        // Call the internal _burn function to destroy tokens
        _burn(from, amount);
    }

    // Add a function to mint tokens by user ID
    function mintByUserId(uint _userId, uint256 amount) public onlyOwner {
        address to = userRegistry.getUserById(_userId).wallet;
        _mint(to, amount);
    }

    // Add a function to burn tokens by user ID
    function burnByUserId(uint _userId, uint256 amount) public onlyOwner {
        address from = userRegistry.getUserById(_userId).wallet;
        _burn(from, amount);
    }

    // Add a function to transfer tokens by user IDs
    function transferByUserIds(
        uint _fromUserId,
        uint _toUserId,
        uint256 amount
    ) public onlyOwner {
        address from = userRegistry.getUserById(_fromUserId).wallet;
        address to = userRegistry.getUserById(_toUserId).wallet;
        transferFrom(from, to, amount);
    }
}
