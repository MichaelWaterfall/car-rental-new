//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract CarRental {
    address public owner;
    //uint ownerBalance;
    uint public price;
    uint public counter;

    constructor(uint _price) {
        owner = msg.sender;
        price = _price;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    struct Renter {
        address payable walletAddress;
        uint id;
        bool canRent;
        bool active;
        uint balance;
        uint due;
        uint start;
        uint end;
    }

    mapping(address => Renter) public renters;

    function addRenter() external {
        require(msg.sender != owner, "The owner cannot rent a car");
        counter += 1;
        renters[msg.sender] = Renter(payable(msg.sender), counter, true, false, 0, 0, 0, 0);
    }

    function getRenterId() external view returns (uint) {
        return renters[msg.sender].id;
    }

    function changePrice(uint newPrice) public onlyOwner {
        require(newPrice > 0, "Price must be greater than zero");
        price = newPrice;
    }

    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != owner, "The new owner must be different to the orignal owner");
        require(renterExists(newOwner) == false, "Renter cannot become the owner");
        owner = newOwner;
    }

    // Get Contract Balance

    function balanceOf() public view returns (uint) {
        return address(this).balance;
    }

    /*
    function getOwnerBalance() view public onlyOwner() returns (uint) {
        return ownerBalance;
    }

    function withdrawOwnerBalance() payable public onlyOwner() {
        payable(owner).transfer(ownerBalance);
    }
    */
    function checkOutCar() external {
        require(renterExists(msg.sender) == true, "Not a renter");
        require(renters[msg.sender].due == 0, "You have a pending balance");
        require(renters[msg.sender].canRent == true, "You cannot rent at this time");
        renters[msg.sender].active = true;
        renters[msg.sender].start = block.timestamp;
        renters[msg.sender].canRent = false;
    }

    function checkInCar() external {
        require(renters[msg.sender].active == true, "Please check out a car first");
        renters[msg.sender].active = false;
        renters[msg.sender].end = block.timestamp;
        setDue();
    }

    // Get total duration of car use
    function renterTimespan(uint start, uint end) internal pure returns (uint) {
        return end - start;
    }

    function getTotalDuration() internal view returns (uint) {
        uint timespan = renterTimespan(renters[msg.sender].start, renters[msg.sender].end);
        uint timespanInMinutes = timespan / 60;
        return timespanInMinutes;
    }

    // Get Renter's balance
    function balanceOfRenter() public view returns (uint) {
        return renters[msg.sender].balance;
    }

    // Set Due amount
    function setDue() internal {
        uint timespanMinutes = getTotalDuration();
        uint fiveMinuteIncrements = timespanMinutes / 5;
        renters[msg.sender].due = fiveMinuteIncrements * price;
    }

    function canRentCar() external view returns (bool) {
        return renters[msg.sender].canRent;
    }

    // Deposit
    function deposit() public payable {
        renters[msg.sender].balance += msg.value;
    }

    // Make Payment
    function makePayment() public {
        console.log("Msg.sender: ", msg.sender);
        require(msg.sender != owner, "Owner cannot make a payment");
        require(renters[msg.sender].due > 0, "You do not have anything due at this time");
        require(
            renters[msg.sender].balance >= renters[msg.sender].due,
            "You do not have enough funds to cover payment. Please make a deposit"
        );
        renters[msg.sender].balance -= renters[msg.sender].due;
        uint payment = renters[msg.sender].due;
        renters[msg.sender].canRent = true;
        renters[msg.sender].due = 0;
        renters[msg.sender].start = 0;
        renters[msg.sender].end = 0;
        (bool success, ) = owner.call{value: payment}("");
        require(success, "Ether failed to send");
    }

    function getDue() external view returns (uint) {
        return renters[msg.sender].due;
    }

    function getRenter() external view returns (uint, bool, bool) {
        uint id = renters[msg.sender].id;
        bool canRent = renters[msg.sender].canRent;
        bool active = renters[msg.sender].active;
        return (id, canRent, active);
    }

    function renterExists(address walletAddress) public view returns (bool) {
        if (renters[walletAddress].walletAddress != address(0)) {
            return true;
        }
        return false;
    }
}
