const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS21 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Shop`)
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`ShopAttacker`)
    attacker = await attackerFactory.deploy(challenge.address)
})

it("Solves the challenge 'Shop'", async () => {
    
    tx = await attacker.attack()
    await tx.wait(1)

    let price = await challenge.price()
    assert(price.toString() == "1", "The price didn't change!")
})
