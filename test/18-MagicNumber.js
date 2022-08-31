const { assert } = require("chai")
const { ethers } = require("hardhat")
require("dotenv").config()

let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS18 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`MagicNum`)
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`MagicNumAttacker`)
    attacker = await attackerFactory.deploy(challenge.address)
})

it("Solves the challenge 'MagicNumber'", async () => {
    tx = await attacker.attack()
    await tx.wait(1)

    let address_solwer = (await challenge.solver()).toString()
    console.log(address_solwer)
    

})
