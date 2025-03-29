const ethers = require('ethers');

async function generateDID(uid) {
  const wallet = ethers.Wallet.createRandom();
  const did = `did:ethr:${wallet.address}`;

  return { did, walletAddress: wallet.address };
}

const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const wallet = new ethers.Wallet(process.env.METAMASK_PRIVATE_KEY, provider);
const contractAddress = process.env.DID_CONTRACT_ADDRESS;
const abi = [
  'function registerDID(string memory _did) public',
  'function getDID(address user) public view returns (string memory)',
];
const contract = new ethers.Contract(contractAddress, abi, wallet);

// 🔹 Register DID on Blockchain
async function registerDIDOnBlockchain(uid, did) {
  const tx = await contract.registerDID(did);
  await tx.wait();

  await usersCollection.doc(uid).set({ did, txHash: tx.hash }, { merge: true });

  return tx.hash;
}

module.exports = {
  generateDID,
  registerDIDOnBlockchain,
};
