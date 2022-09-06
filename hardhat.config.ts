import "@nomicfoundation/hardhat-toolbox"
import { HardhatUserConfig } from "hardhat/config"

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL!
const PRIVATE_KEY = process.env.PRIVATE_KEY!

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
}

export default config