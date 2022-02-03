const Web3 = require("web3");
import { Contract, providers, utils, BigNumber } from 'ethers';

const rpcURL = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
const web3 = new Web3(rpcURL)
const miniABI = require("./abi/common.json");
const presaleCreateAbi = require("./abi/presaleCreate.json");
const presaleAbi = require("./abi/presale.json"); 

const presaleCreateAddress_dev = "0x4EE6e594aD35F852f5c4BC31826D0AB2a809fF63";
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
		return null;
	}
}

export async function getBalanceOfToken(tokenAddr, userAddr) {
	try {
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (provider && network && (network.chainId === 97 || network.chainId === 56)) {
			const contract = new Contract(tokenAddr, miniABI, provider.getSigner());
			const decimals = await contract.decimals();
			const balance = (await contract.balanceOf(userAddr)).div(BigNumber.from('10').pow(decimals)).toNumber();
			console.log(balance);
			return balance;
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
			console.log(amount, utils.parseEther(amount.toString()).toString());
			return await contract.approve(presaleCreateAddress_dev, utils.parseEther(amount.toString()));
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
			return await contract.approve(presaleCreateAddress_dev, utils.parseEther(amount.toString()));
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
			console.log('at create presale', utils.parseEther(availableTokens.toString()))
			const uints = [
				utils.parseEther(softCap.toString()),
				utils.parseEther(hardCap.toString()),
				presaleRate,
				utils.parseEther(bnbLimit.toString()),
				utils.parseEther(bnbMax.toString()),
				percentageRaised,
				Math.ceil(startDate / 1000),
				Math.ceil(endDate / 1000),
				utils.parseEther(availableTokens.toString())
			];
			const bools = [
				isWhitelisted,
				isBnb
			];
			const whitelistArr = [ ...whitelist ];
			await contract.createPresale(
				addrs,
				uints,
				bools,
				whitelistArr
			);
			return true;
		}
	} catch(e) {
		console.log('error occured at createpresale', e);
		return false;
	}
}

export async function getPresales() {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleCreateAddress_dev, presaleCreateAbi, provider.getSigner());	

			const presaleInfoList = (await contract.getPresales()).map(presaleInfo => {
				return {
					...presaleInfo,
					startTime: new Date(presaleInfo.startTime.mul(1000).toNumber()),
					endTime: new Date(presaleInfo.endTime.mul(1000).toNumber()),
					createdAt: new Date(presaleInfo.createdAt.mul(1000).toNumber())
				};
			});
			return presaleInfoList;
		}
	} catch(e) {
		console.log('Error occured in getPresales', e);
		return "";
	}
}

export async function getPresaleInfo(presaleAddr) {
	try {
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleAddr, presaleAbi, provider.getSigner());
			// console.log('here', presaleAddr, provider.getSigner())
			const presale = await contract.getInfo();

			return {
				...presale,
				startTime: new Date(presale.startTime.mul(1000).toNumber()),
				endTime: new Date(presale.endTime.mul(1000).toNumber()),
				createdAt: new Date(presale.createdAt.mul(1000).toNumber())
			};
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

export async function checkJoined(address) {
	try{
		const provider = getProvider();
		const network = await getCurrentNetwork();
		if (network.chainId === 97 || network.chainId === 56) {
			const contract = new Contract(presaleCreateAddress_dev, presaleAbi, provider.getSigner());
			return await contract.joined(address);
		}
	} catch(e) {
		console.log(e);
		return "";
	}
}
