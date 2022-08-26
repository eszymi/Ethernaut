const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS14 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`GatekeeperTwo`)
    challenge = await challengeFactory.attach(challengeAddress)
})

it("Solves the challenge 'GatekeeperTwo'", async () => {
    const attackerFactory = await ethers.getContractFactory(`GatekeeperTwoAttacker`)
    attacker = await attackerFactory.deploy(challengeAddress)

    let entrant = (await challenge.entrant()).toString()
    assert(entrant == player.address, "Not entered!")
})
