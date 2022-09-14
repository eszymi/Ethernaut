const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS23 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`DexTwo`)
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`DexTwoAttacker`)
    attacker = await attackerFactory.deploy(challenge.address)
})

it("Solves the challenge 'DexTwo'", async () => {
    tx = await attacker.attack()
    await tx.wait(1)

    let token1 = await challenge.token1()
    let token2 = await challenge.token2()
    let balance1 = await challenge.balanceOf(token1, challenge.address)
    let balance2 = await challenge.balanceOf(token2, challenge.address)
    assert(balance1.toString() == "0", "You didn't take everything from token1!")
    assert(balance2.toString() == "0", "You didn't take everything from token2!")
})
