import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", function () {
  // Nested describe can be used
  let simpleStorageFactory: SimpleStorage__factory
  let simpleStorage: SimpleStorage
  beforeEach(async function () {
    simpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory
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
  it("Should add a person with a favourite number and index correctly", async function () {
    const newPerson: string = "Ryan"
    const newFavoriteNumber: string = "12"
    const transactionResponse = await simpleStorage.addPerson(
      newPerson,
      newFavoriteNumber
    )
    await transactionResponse.wait(1)
    const { favoriteNumber, name } = await simpleStorage.people(0)
    assert(name, newPerson)
    assert(favoriteNumber, newFavoriteNumber)
  })
})
