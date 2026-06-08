// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const votingContract = await hre.ethers.getContractFactory("Voting");
  const deployedVotingContract = await votingContract.deploy();

  console.log(`Contract Address deployed: ${deployedVotingContract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Contract Address deployed: 0xB34B51B3A2b92d92917d841C3e957889c32D589B
// https://mumbai.polygonscan.com/address/0xB34B51B3A2b92d92917d841C3e957889c32D589B#code

// 0x93416a52e18009aF623AB60FEEb6ED2386c77B56
// https://mumbai.polygonscan.com/address/0x93416a52e18009aF623AB60FEEb6ED2386c77B56#code

// latest
// 0x3C808Cf8B653991457e3BcF29b18a1868D187bEd
// https://mumbai.polygonscan.com/address/0x3C808Cf8B653991457e3BcF29b18a1868D187bEd#code

// 0x4cDBac52C82Bc4d9Edc36a959dCE5EC7e86F0c74
// https://mumbai.polygonscan.com/address/0x4cDBac52C82Bc4d9Edc36a959dCE5EC7e86F0c74#code
