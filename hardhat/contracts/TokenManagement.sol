// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

// Import the ERC20 contract from OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Define the TokenManagement contract that inherits from the ERC20 contract
contract TokenManagement is ERC20 {
    // Define the owner variable which represents the address of the contract owner
    address public owner; // Define a modifier called onlyOwner, which ensures that only the contract owner can call functions with this modifier
    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    // Define the constructor, which takes the initial token supply as an argument
    constructor(
        uint256 initialSupply
    ) ERC20("DecentralizedJobMarketToken", "DJMT") {
        // Mint the initial token supply and assign it to the contract deployer
        _mint(msg.sender, initialSupply);
        // Set the owner variable to the address of the contract deployer
        owner = msg.sender;
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
}
