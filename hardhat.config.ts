import "dotenv/config"
import "@nomiclabs/hardhat-etherscan"
import "@nomicfoundation/hardhat-toolbox"
import { HardhatUserConfig } from "hardhat/config"

const PRIVATE_KEY = process.env.PRIVATE_KEY!
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL!
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY!

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL!,
      accounts: [PRIVATE_KEY!],
      chainId: 5,
    },
  },
  solidity: "0.8.9",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
}

export default config
