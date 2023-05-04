const hre = require("hardhat");

async function main() {
  const smartContract = "JobListing"

  const Contract = await hre.ethers.getContractFactory(smartContract);
  const contract = await Contract.deploy(
    "0x7aE7C3cA1230c9128329E6ec7021eC7b9cac6c5c",
    "0x88320c4f3161C17C4a85d6aF872f282b10999E17",
    "0xf000A44eD9E859F394A1f5C1e59c67ADF9d82E66",
  );

  await contract.deployed();

  console.log(`${smartContract} deployed to ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// DisputeResolution deployed to 0xfE02b0230775531655C2Abb086B01a9145CF8AAf => not important
// Escrow deployed to 0x347292084aBC5F9C78E56A2932fbfE94Be04aeF1 => not important
// JobApplication deployed to 0xbe0a81eB4371A5885bFb48AEF344cB90FcBBDA50
// ReputationSystem deployed to 0x7aE7C3cA1230c9128329E6ec7021eC7b9cac6c5c => a little bit important but not a priority
// TokenManagement deployed to 0x88320c4f3161C17C4a85d6aF872f282b10999E17 => not important
// UserRegistry deployed to 0xf000A44eD9E859F394A1f5C1e59c67ADF9d82E66
// JobListing deployed to 0x609F3ff08833fC72410b511EA58346f3ddFcFBC7