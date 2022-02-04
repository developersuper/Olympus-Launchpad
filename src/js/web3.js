import { Contract, utils, BigNumber } from 'ethers';

const miniABI = require("./abi/common.json");
const presaleCreateAbi = require("./abi/presaleCreate.json");
const presaleAbi = require("./abi/presale.json"); 

const presaleCreaterAddress_dev = "0x670833F34e90127D8F779c559545E03bcB09AB81";
// const presaleCreateAddress_prod = "";

export async function getDecimals(tokenAddr, provider) {
	try{
		const contract = new Contract(tokenAddr, miniABI, provider.getSigner());
		const decimals = await contract.decimals();
		return decimals;
	}catch(e) {
		console.log('Error in getDecimals in web3.js', e);
		return 18;
	}
}

export async function getName(address, provider) {
	try {
		const contract = new Contract(address, miniABI, provider.getSigner());
		return await contract.symbol();
	} catch(e) {
		console.log(e);
		return '';
	}
}

export async function getBalanceOfToken(tokenAddr, userAddr, provider) {
	try {
		const contract = new Contract(tokenAddr, miniABI, provider.getSigner());
		const decimals = await contract.decimals();
		const balance = (await contract.balanceOf(userAddr)).div(BigNumber.from('10').pow(decimals)).toNumber();
		return balance;
	}catch(e) {
		console.log('Error Occured at getBalanceOfToken', e);
		return null;
	}
}

export const detectAddress = async (address, web3) => {
	return await web3.eth.getCode(address);
}

// export async function getMyAccount() {
// 	return await web3.eth.getAccounts();
// }

export const getBalance = async (address, provider) => {
	try{
		return await provider.getBalance(address);
	}catch(e) {
		console.log('Error in getBalance in web3.js:', e);
		return null;
	}
}

export async function approve(address, amount, provider) {
	try{
		const contract = new Contract(address, miniABI, provider.getSigner());
		return await contract.approve(presaleCreaterAddress_dev, utils.parseEther(amount.toString()));
	} catch(e) {
		console.log(e);
		return null;
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
	whitelist,
	provider,
) {
	try{
		const contract = new Contract(presaleCreaterAddress_dev, presaleCreateAbi, provider.getSigner());
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
			whitelistArr,
			{
				value: utils.parseEther('0.0001')
			}
		);
		return true;
	} catch(e) {
		console.log('error occured at createpresale', e);
		return false;
	}
}

export async function getPresales(provider) {
	try{
		const contract = new Contract(presaleCreaterAddress_dev, presaleCreateAbi, provider);	
		const presaleInfoList = (await contract.getPresales()).map(presaleInfo => {
			return {
				...presaleInfo,
				startTime: new Date(presaleInfo.startTime.mul(1000).toNumber()),
				endTime: new Date(presaleInfo.endTime.mul(1000).toNumber()),
				createdAt: new Date(presaleInfo.createdAt.mul(1000).toNumber())
			};
		});
		return presaleInfoList;
	}catch(e) {
		console.log('Error occured in getPresales', e);
		return "";
	}
}

export async function getPresaleInfo(presaleAddr, provider) {
	try {
		const contract = new Contract(presaleAddr, presaleAbi, provider.getSigner());
		const presale = await contract.getInfo();

		return {
			...presale,
			startTime: new Date(presale.startTime.mul(1000).toNumber()),
			endTime: new Date(presale.endTime.mul(1000).toNumber()),
			createdAt: new Date(presale.createdAt.mul(1000).toNumber())
		};
	}catch(e) {
		console.log("Error occured!", e);
		return null;
	}
}

export async function addWhitelist(addresses, provider) {
	try{
		const contract = new Contract(presaleCreaterAddress_dev, presaleAbi, provider.getSigner());
		return await contract.addWhitelist(addresses);
	} catch(e) {
		console.log(e);
		return "";
	}
}

export async function removeWhitelist(addresses, provider) {
	try{
		const contract = new Contract(presaleCreaterAddress_dev, presaleAbi, provider.getSigner());
		return await contract.removeWhitelist(addresses);
	} catch(e) {
		console.log(e);
		return "";
	}
}

export async function getWhitelist(addresses, provider) {
	try{
		const contract = new Contract(presaleCreaterAddress_dev, presaleAbi, provider.getSigner());
		return await contract.getWhitelist(addresses);
	} catch(e) {
		console.log(e);
		return "";
	}
}

export async function checkJoined(address, provider) {
	try{
		const contract = new Contract(presaleCreaterAddress_dev, presaleAbi, provider.getSigner());
		return await contract.joined(address);
	} catch(e) {
		console.log(e);
		return "";
	}
}
