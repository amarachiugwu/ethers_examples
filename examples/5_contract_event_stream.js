const { ethers } = require("ethers");
require('dotenv').config()

const INFURA_RINKEBY_API_KEY_URL = process.env.INFURA_RINKEBY_API_KEY_URL

const provider = new ethers.providers.JsonRpcProvider(`${INFURA_RINKEBY_API_KEY_URL}`)

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const block = await provider.getBlockNumber()

    const transferEvents = await contract.queryFilter('Transfer', block - 1, block)
    console.log(transferEvents)
}

main()