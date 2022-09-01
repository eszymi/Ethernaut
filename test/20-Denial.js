const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS20 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Denial`)
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`DenialAttacker`)
    attacker = await attackerFactory.deploy(challenge.address)
})

it("Solves the challenge 'Denial'", async () => {
    tx = await attacker.attack()
    await tx.wait(1)
})
