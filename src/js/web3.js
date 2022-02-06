import { Contract, utils, BigNumber, providers } from 'ethers';
import Web3 from "web3";

const miniABI = require("./abi/common.json");
const presaleCreateAbi = require("./abi/presaleCreate.json");
const presaleAbi = require("./abi/presale.json"); 
import { RPC } from "@/js/constants";

const presaleCreaterAddress_dev = "0x670833F34e90127D8F779c559545E03bcB09AB81";
// const presaleCreateAddress_prod = "";

export async function getDecimals(tokenAddr) {
	try{
		const provider = new providers.JsonRpcProvider(RPC);
		const contract = new Contract(tokenAddr, miniABI, provider);
		const decimals = await contract.decimals();
		return decimals;
	}catch(e) {
		console.log('Error in getDecimals in web3.js', e);
		return 18;
	}
}

export async function getName(address) {
	try {
		const provider = new providers.JsonRpcProvider(RPC);
		const contract = new Contract(address, miniABI, provider);
		return await contract.symbol();
	} catch(e) {
		console.log('Error in getName', e);
		return '';
	}
}

export async function getBalanceOfToken(tokenAddr, userAddr) {
	try {
		const provider = new providers.JsonRpcProvider(RPC);
		const contract = new Contract(tokenAddr, miniABI, provider);
		const decimals = await contract.decimals();
		const balance = (await contract.balanceOf(userAddr)).div(BigNumber.from('10').pow(decimals)).toNumber();
		return balance;
	}catch(e) {
		console.log('Error Occured at getBalanceOfToken', e);
		return null;
	}
}

export const detectAddress = (address) => {
	try{
		return Web3.utils.isAddress(address);
	}catch(e) {
		console.log('Error in detectAddress: ', e);
	}

}

// export async function getMyAccount() {
// 	return await web3.eth.getAccounts();
// }

export const getBalance = async (address) => {
	try{
		const provider = new providers.JsonRpcProvider(RPC);
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
	addrs,
	uints,
	bools,
	whitelistArr,
	provider,
) {
	try{
		const contract = new Contract(presaleCreaterAddress_dev, presaleCreateAbi, provider.getSigner());
		console.log('in createpresale', provider, addrs, uints, bools, whitelistArr);
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

export async function getPresales() {
	try{
		const provider = new providers.JsonRpcProvider(RPC);
		const contract = new Contract(presaleCreaterAddress_dev, presaleCreateAbi, provider);	
		const presaleInfoList = (await contract.getPresales()).map((presaleInfo, idx) => {
			return {
				...presaleInfo,
				startTime: new Date(presaleInfo.startTime.mul(1000).toNumber()),
				endTime: new Date(presaleInfo.endTime.mul(1000).toNumber()),
				createdAt: new Date(presaleInfo.createdAt.mul(1000).toNumber()),
				id: idx,
			};
		});
		return presaleInfoList;
	}catch(e) {
		console.log('Error occured in getPresales', e);
		return "";
	}
}

export async function getPresaleInfo(presaleAddr) {
	try {
		const provider = new providers.JsonRpcProvider(RPC);
		const contract = new Contract(presaleAddr, presaleAbi, provider);
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

export async function checkJoined(address) {
	try{
		const provider = new providers.JsonRpcProvider(RPC);
		const contract = new Contract(presaleCreaterAddress_dev, presaleAbi, provider);
		return await contract.joined(address);
	} catch(e) {
		console.log(e);
		return "";
	}
}
