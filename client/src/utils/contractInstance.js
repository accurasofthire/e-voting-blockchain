import { ethers } from 'ethers';
import abi from "./Voting.json";

export const contractABI = abi.abi;

// export const contractAddress = "0x00f782791E857d4c2Cd6217e0226D73EE41dea01";
// export const contractAddress = "0xA75b52d57d07C3FAf31A15738C1e6Fa2a195926b"; 
// export const contractAddress = "0x3C808Cf8B653991457e3BcF29b18a1868D187bEd";
export const contractAddress = "0x4cDBac52C82Bc4d9Edc36a959dCE5EC7e86F0c74";
async function contractInstance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    // const network = await provider.getNetwork();
    // const networkId = network.chainId;
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    // localStorage.setItem('nid', networkId);
    // console.log(`Contract: ${contract.address}`);
    // console.log(`Signer: ${signerAddress}`);
    return { contract, signerAddress };
}

export default contractInstance;