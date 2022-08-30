const { ethers } = require("ethers");
require('dotenv').config()

const INFURA_RINKEBY_API_KEY_URL = process.env.INFURA_RINKEBY_API_KEY_URL

const provider = new ethers.providers.JsonRpcProvider(`${INFURA_RINKEBY_API_KEY_URL}`)

const main = async () => {
    const block = await provider.getBlockNumber()

    console.log(`\nBlock Number: ${block}\n`)

    const blockInfo = await provider.getBlock(block)

    console.log(blockInfo)

    const { transactions } = await provider.getBlockWithTransactions(block)

    console.log(`\nLogging first transaction in block:\n`)
    console.log(transactions[0])
}

main()