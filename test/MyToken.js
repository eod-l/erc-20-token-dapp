const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  it("mints initial supply to deployer", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
    await token.waitForDeployment();

    const balance = await token.balanceOf(owner.address);
    const totalSupply = await token.totalSupply();

    expect(balance).to.equal(totalSupply);
  });
});
