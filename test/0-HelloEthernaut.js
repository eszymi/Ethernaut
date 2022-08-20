const { ethers } = require("hardhat")
require("dotenv").config()

const abi = [
    {
        inputs: [{ internalType: "string", name: "_password", type: "string" }],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [{ internalType: "string", name: "passkey", type: "string" }],
        name: "authenticate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xaa613b29",
    },
    {
        inputs: [],
        name: "getCleared",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x3c848d78",
    },
    {
        inputs: [],
        name: "info",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
        constant: true,
        signature: "0x370158ea",
    },
    {
        inputs: [],
        name: "info1",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
        constant: true,
        signature: "0xd4c3cf44",
    },
    {
        inputs: [{ internalType: "string", name: "param", type: "string" }],
        name: "info2",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
        constant: true,
        signature: "0x2133b6a9",
    },
    {
        inputs: [],
        name: "info42",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
        constant: true,
        signature: "0x2cbd79a5",
    },
    {
        inputs: [],
        name: "infoNum",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0xc253aebe",
    },
    {
        inputs: [],
        name: "method7123949",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "pure",
        type: "function",
        constant: true,
        signature: "0xf0bc7081",
    },
    {
        inputs: [],
        name: "password",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x224b610b",
    },
    {
        inputs: [],
        name: "theMethodName",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0xf157a1e3",
    },
]

let player, challenge, challengeAddress, tx

beforeEach(async () => {
    accounts = await ethers.getSigners()
    player = accounts[0]
    challengeAddress = process.env.CHALLENGEADDRESS0 //address of my instance contract
    challenge = await ethers.getContractAt(abi, challengeAddress)
})

it("Solves the challange 'Hello Ethernaut'", async () => {
    const infos = await Promise.all([
        challenge.info(),
        challenge.info1(),
        challenge.info2(`hello`),
        challenge.infoNum(),
        challenge.info42(),
        challenge.theMethodName(),
        challenge.method7123949(),
    ])
    // console.log(infos.join(`\n`))

    const password = await challenge.password()
    // console.log(`password = ${password}`)

    tx = await challenge.authenticate(password)
    await tx.wait(1)
})
