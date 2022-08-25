const { assert } = require("chai")
const { ethers } = require("hardhat")
require("dotenv").config()

let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]
    const challengeFactory = await ethers.getContractFactory(`CoinFlip`)
    challengeAddress = process.env.CHALLENGEADDRESS3 //address of my instance contract
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`CoinFlipAttacker`)
    attacker = await attackerFactory.deploy(challenge.address)
})

it("Solves the challenge 'CoinFlip'", async () => {
    // We need 10 wins, so we will use for loop
    for (let i = 0; i < 10; i++) {
        tx = await attacker.flip()
        // Command tx.wait(1) make that we wait one block for confirmation that next block is mined
        await tx.wait(1)
    }

    let consecutiveWins = await challenge.consecutiveWins()
    assert(consecutiveWins.toString() == "10", "You haven't won 10 times in a row!")
})
