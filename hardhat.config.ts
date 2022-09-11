import "dotenv/config"
import "solidity-coverage"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "./tasks/block-number"
import "@nomiclabs/hardhat-etherscan"
import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-chai-matchers"
import { HardhatUserConfig } from "hardhat/config"

const PRIVATE_KEY = process.env.PRIVATE_KEY!
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL!
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY!
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY!

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL!,
      accounts: [PRIVATE_KEY!],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  solidity: "0.8.9",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
}

export default config
