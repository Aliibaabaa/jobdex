// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

contract UserRegistry {
    enum UserType {
        JobSeeker,
        Employer
    }

    struct User {
        uint id;
        UserType userType;
        string name;
        string email;
        address wallet;
        bool isRegistered;
    }

    uint private userCounter;
    mapping(uint => User) private users;
    mapping(address => uint) private userLookup;

    event UserRegistered(
        uint indexed userId,
        UserType userType,
        string name,
        string email,
        address wallet
    );

    function registerUser(
        UserType _userType,
        string memory _name,
        string memory _email
    ) public {
        require(!isUserRegistered(msg.sender), "User already registered");

        userCounter++;
        User memory newUser = User(
            userCounter,
            _userType,
            _name,
            _email,
            msg.sender,
            true
        );

        users[userCounter] = newUser;
        userLookup[msg.sender] = userCounter;

        emit UserRegistered(userCounter, _userType, _name, _email, msg.sender);
    }

    function getUserById(uint _userId) public view returns (User memory) {
        return users[_userId];
    }

    function getUserByAddress(
        address _wallet
    ) public view returns (User memory) {
        uint userId = userLookup[_wallet];
        return users[userId];
    }

    function isUserRegistered(address _wallet) public view returns (bool) {
        uint userId = userLookup[_wallet];
        return users[userId].isRegistered;
    }
}
