// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Escrow contract will handle escrow services, ensuring secure and transparent 
// transactions between users for completed jobs.
contract Escrow is Ownable {
    // 'Payment' struct consists of data regarding the payment to the smart contract
    struct Payment {
        uint jobId;
        address payer;
        address payable payee;
        uint256 amount;
        bool isReleased;
    }

    uint private paymentCounter;
    // mapping of payment ID to the 'Payment' struct
    mapping(uint => Payment) private payments;

    // instantiate 'token' as IERC20
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
        // assigns the '_token' params to the 'token' state variable
        token = _token;
    }

    /* 
    @dev 'createPayment' instantiate a 'Payment' struct and maps it to the 'paymentCounter'
          and adds it to the 'payments' mapping. The payment will be transfered from
         'msg.sender' to this smart contract
    @params '_jobId' the ID of the job posting
            '_payee' address of the payee
            '_amount' amount to pay
    */
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

    /*  
    @dev 'releasePayment' takes the payment ID, checks if the payment is not yet
          released. If not, then 'payment.isReleased' will be changed to true.
          The token will be transfered to the payee
    */
    function releasePayment(uint _paymentId) public onlyOwner {
        Payment storage payment = payments[_paymentId];

        require(!payment.isReleased, "Payment already released");

        payment.isReleased = true;

        token.transfer(payment.payee, payment.amount);

        emit PaymentReleased(_paymentId);
    }

    /*  
    @dev 'getPayment' returns the payment details based on the passed payment ID
    */
    function getPayment(uint _paymentId) public view returns (Payment memory) {
        return payments[_paymentId];
    }
}
