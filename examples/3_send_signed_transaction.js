const { ethers } = require("ethers");
require('dotenv').config()

const INFURA_RINKEBY_API_KEY_URL = process.env.INFURA_RINKEBY_API_KEY_URL

const provider = new ethers.providers.JsonRpcProvider(`${INFURA_RINKEBY_API_KEY_URL}`)

const account1 = '0x7Bd5f674D8D82286d10B75d63CF18ea3c45d2AbD' // Your account address 1
const account2 = '0x2446734ecD686c3e80B6B793AA31531A1bfc6F7d' // Your account address 2

const ACCOUNT_PRIVATE_KEY1 = process.env.ACCOUNT_PRIVATE_KEY1 // Private key of account 1
const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY1, provider)

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1)
    const recieverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.025")
    })

    await tx.wait()
    console.log(tx)

    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()