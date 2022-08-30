const { ethers } = require("ethers");
require('dotenv').config()

const INFURA_MAINNET_API_KEY_URL = process.env.INFURA_MAINNET_API_KEY_URL

const provider = new ethers.providers.JsonRpcProvider(`${INFURA_MAINNET_API_KEY_URL}`)

const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
}

main()

