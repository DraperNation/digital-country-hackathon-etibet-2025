const { ethers } = require('hardhat');

async function main() {
  const TibetanDIDRegistry =
    await ethers.getContractFactory('TibetanDIDRegistry');
  const contract = await TibetanDIDRegistry.deploy();
  await contract.waitForDeployment();

  console.log('✅ Contract deployed at:', await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
