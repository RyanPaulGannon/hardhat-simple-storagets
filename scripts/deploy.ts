import { ethers, run, network } from "hardhat"

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log(`Deploying contract...`)
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`)
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`The current value is: ${currentValue}`)

  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`The updated value is: ${updatedValue}`)
}

async function verify(address: string, args: any) {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: address, 
      constructorArgs: args,
    })
  } catch (error: unknown) {
    const e = error as ErrorEvent
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified")
    } else {
      console.error(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
