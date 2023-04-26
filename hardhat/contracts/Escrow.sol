// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is Ownable {
    struct Payment {
        uint jobId;
        address payer;
        address payable payee;
        uint256 amount;
        bool isReleased;
    }

    uint private paymentCounter;
    mapping(uint => Payment) private payments;

    IERC20 private token;

    event PaymentCreated(
        uint indexed paymentId,
        uint indexed jobId,
        address indexed payer,
        address payee,
        uint256 amount
    );
    event PaymentReleased(uint indexed paymentId);

    constructor(IERC20 _token) {
        token = _token;
    }

    function createPayment(
        uint _jobId,
        address payable _payee,
        uint256 _amount
    ) public {
        require(
            token.balanceOf(msg.sender) >= _amount,
            "Insufficient token balance"
        );

        paymentCounter++;

        Payment memory newPayment = Payment(
            _jobId,
            msg.sender,
            _payee,
            _amount,
            false
        );
        payments[paymentCounter] = newPayment;

        token.transferFrom(msg.sender, address(this), _amount);

        emit PaymentCreated(
            paymentCounter,
            _jobId,
            msg.sender,
            _payee,
            _amount
        );
    }

    function releasePayment(uint _paymentId) public onlyOwner {
        Payment storage payment = payments[_paymentId];

        require(!payment.isReleased, "Payment already released");

        payment.isReleased = true;

        token.transfer(payment.payee, payment.amount);

        emit PaymentReleased(_paymentId);
    }

    function getPayment(uint _paymentId) public view returns (Payment memory) {
        return payments[_paymentId];
    }
}
