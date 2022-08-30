const { ethers } = require("ethers");
require('dotenv').config()

const INFURA_RINKEBY_API_KEY_URL = process.env.INFURA_RINKEBY_API_KEY_URL

const provider = new ethers.providers.JsonRpcProvider(`${INFURA_RINKEBY_API_KEY_URL}`)

const account1 = '0x7Bd5f674D8D82286d10B75d63CF18ea3c45d2AbD' // Your account address 1
const account2 = '0x2446734ecD686c3e80B6B793AA31531A1bfc6F7d' // Your account address 2

const ACCOUNT_PRIVATE_KEY1 = process.env.ACCOUNT_PRIVATE_KEY1 // Private key of account 1
const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY1, provider)

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = '0x01be23585060835e02b77ef475b0cc51aa1e0709' // LINK chainlink token
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)


    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, balance)
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()