const Web3 = require("web3");
import { Contract, providers, utils } from 'ethers';

const rpcURL = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
const web3 = new Web3(rpcURL)
const miniABI = require("./abi/common.json");
const presaleCreateAbi = require("./abi/presaleCreate.json");
const presaleAbi = require("./abi/presale.json"); 

const presaleCreateAddress_dev = "0xE1fB776A707BaCd6b5A0666643631BBcd590D409";
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

export async function getBalanceOfToken(tokenAddr, userAddr) {
	try {
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(tokenAddr, miniABI, provider.getSigner());
			return await contract.balanceOf(userAddr);
		}
	}catch(e) {
		console.log('Error Occured at getBalanceOfToken', e);
		return null;
	}
}

export async function setApprove(tokenAddr, amount) {
	try {
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(tokenAddr, miniABI, provider.getSigner());
			return await contract.approve(presaleCreateAddress_dev, amount);
		}
	}catch(e) {
		console.log('Error Occured at getBalanceOfToken', e);
		return null;
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

export async function approve(address, amount) {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(address, miniABI, provider.getSigner());
			return await contract.approve(presaleCreateAddress_dev, amount);
		}
	} catch(e) {
		console.log(e);
		return "";
	}
}

export async function createPresale(
	tokenAddr,
	ownerAddr,
	softCap,
	hardCap,
	presaleRate,
	bnbLimit,
	bnbMax,
	percentageRaised,
	startDate,
	endDate,
	availableTokens,
	isWhitelisted,
	isBnb,
	whitelist
) {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleCreateAddress_dev, presaleCreateAbi, provider.getSigner());
			const addrs = [
				tokenAddr,
				ownerAddr
			];
			const uints = [
				utils.parseEther(softCap.toString()),
				utils.parseEther(hardCap.toString()),
				presaleRate,
				utils.parseEther(bnbLimit.toString()),
				utils.parseEther(bnbMax.toString()),
				percentageRaised,
				Math.floor(startDate / 1000),
				Math.floor(endDate / 1000),
				availableTokens
			];
			const bools = [
				isWhitelisted,
				isBnb
			];
			console.log(addrs, uints, bools, whitelist, contract);
			await contract.createPresale(
				addrs,
				uints,
				bools,
				whitelist
			);
		}
	} catch(e) {
		console.log('error occured at createpresale', e);
		return "";
	}
}

export async function getPresales() {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleCreateAddress_dev, presaleCreateAbi, provider.getSigner());
			const presaleList = await contract.getPresales();
			
			const presaleInfoList = await Promise.all(presaleList.map(async (presale) => {
				const info = await getPresaleInfo(presale[2]);
				return {
				  ...presale,
				  ...info,
				}
			  }));
			
			return presaleInfoList;
		}
	} catch(e) {
		console.log(e);
		return "";
	}
}

export async function getPresaleInfo(presaleAddr) {
	try {
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleAddr, presaleAbi, provider.getSigner());
			const presaleList = await contract.getInfo();
			return presaleList;
		}
	}catch(e) {
		console.log("Error occured!", e);
		return null;
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
