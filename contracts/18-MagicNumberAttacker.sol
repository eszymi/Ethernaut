// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./18-MagicNumber.sol";

contract MagicNumAttacker {
    MagicNum public magicNum;

    constructor(address _magicNumAddress) public {
        magicNum = MagicNum(_magicNumAddress);
    }

    function attack() public {
        address new_address;
        bytes memory bytecode = hex"600a600c600039600a6000f3602a60005260206000f3";
        bytes32 salt = 0;
        assembly {
            /*create2(v, p, n, s)
            create new contract with code at memory p to p + n
            and send v wei
            and return the new address
            where new address = first 20 bytes of keccak256(0xff + address(this) + s + keccak256(mem[p…(p+n)))
            s = big-endian 256-bit value*/
            new_address := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
        }

        magicNum.setSolver(new_address);
    }
}
