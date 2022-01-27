const Web3 = require("web3");
import { Contract, providers } from 'ethers';

const rpcURL = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
const web3 = new Web3(rpcURL)
const miniABI = require("./abi/common.json");
const presaleCreateAbi = require("./abi/presaleCreate.json");
const presaleAbi = require("./abi/presale.json"); 

const presaleCreateAddress_dev = "0x7b7fD4cE8248DDf177db5495E6cC2Ab53292f6E1";
const presaleCreateAddress_prod = "";

export function getEthereum() {
    return window.ethereum;
}

export function getProvider() {
    return new providers.Web3Provider(getEthereum(), "any");
}

export async function getCurrentNetwork() {
    const provider = getProvider();
    return provider.getNetwork();
}

export async function getName(address) {
	try {
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(address, miniABI, provider.getSigner());
			return await contract.symbol();
		}
	} catch(e) {
		console.log(e);
		return "";
	}
}

export const detectAddress = async (address) => {
	return await web3.eth.getCode(address);
}

export async function getMyAccount() {
	return await web3.eth.getAccounts();
}

export const getBalance = async (address) => {
	return await web3.eth.getBalance(address);
}

export async function getContractAddress() {
	const network = await getCurrentNetwork();
	if (network.chainId === 97) {
		return presaleCreateAddress_dev;
	} else {
		return presaleCreateAddress_prod;
	}
}

export async function Approve(address, amount) {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(address, miniABI, provider.getSigner());
			await contract.approve(presaleCreateAddress_dev, amount);
		}
	} catch(e) {
		console.log(e);
		return "";
	}
}

export async function createPresale(addresses, units, bools, whitelisted) {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleCreateAddress_dev, presaleCreateAbi, provider.getSigner());
			await contract.createPresale(addresses, units, bools, whitelisted);
		}
	} catch(e) {
		console.log(e);
		return "";
	}
}

export async function getPresales() {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleCreateAddress_dev, presaleCreateAbi, provider.getSigner());
			return await contract.getPresales();
		}
	} catch(e) {
		console.log(e);
		return "";
	}
}

export async function addWhitelist(addresses) {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleCreateAddress_dev, presaleAbi, provider.getSigner());
			return await contract.addWhitelist(addresses);
		}
	} catch(e) {
		console.log(e);
		return "";
	}
}

export async function removeWhitelist(addresses) {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleCreateAddress_dev, presaleAbi, provider.getSigner());
			return await contract.removeWhitelist(addresses);
		}
	} catch(e) {
		console.log(e);
		return "";
	}
}

export async function getWhitelist(addresses) {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleCreateAddress_dev, presaleAbi, provider.getSigner());
			return await contract.getWhitelist(addresses);
		}
	} catch(e) {
		console.log(e);
		return "";
	}
}