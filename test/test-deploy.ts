import { describe } from "mocha"
import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage } from "../typechain-types"

describe("SimpleStorage", function () {
  // Nested describe can be used
  let simpleStorageFactory, simpleStorage: SimpleStorage
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue: string = "0"

    // assert.equal(currentValue.toString(), expectedValue)

    // Expect example
    expect(currentValue.toString()).to.equal(expectedValue)
  })
  //it.only will run this test alone
  it("Should update when we call 'store'", async function () {
    const expectedValue: string = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })
})
