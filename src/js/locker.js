import {
    BEP20_ABI,
    BUSD,
    FACTORIES,
    FACTORY_ABI,
    INFO_ABI,
    INFO_ADR,
    LOCK_FEE,
    UINT_MAX,
    WBNB
} from "@/js/constants";
import {BNtoString, toMinPrecisionString} from "@/js/utilities";

export async function getAllLocks(web3, factory){
    let contract = new web3.eth.Contract(FACTORY_ABI, factory);
    let data = await contract.methods.getAllLocks().call();
    return data;
}

export async function getLockHoldings(web3, holder, factory){
    let contract = new web3.eth.Contract(FACTORY_ABI, factory);
    return await contract.methods.getLockHoldings(holder).call();
}

export async function getLockHolders(web3, lock){

}

export async function loadTokenInfo(web3, token){
    let contract = new web3.eth.Contract(INFO_ABI, INFO_ADR);
    return contract.methods._getTokenInfo(token).call();
}

export async function loadLPInfo(web3, pair){
    let contract = new web3.eth.Contract(INFO_ABI, INFO_ADR);
    return contract.methods._getLPInfo(pair).call();
}

export async function getSingleTokenHolderInfo(web3, token, holder, approvalTarget) {
    let contract = new web3.eth.Contract(INFO_ABI, INFO_ADR);
    return contract.methods.getSingleTokenHolderInfo(holder, token, approvalTarget).call();
}

export async function loadTokenLockInfo(web3, bnbPrice, lock){
    let contract = new web3.eth.Contract(INFO_ABI, INFO_ADR);
    let info = await contract.methods.getTokenLockInfo(lock).call();

    info.supplyLocked = (100 * info.info.lockedTokenAmount / info.token.supply).toFixed(2) + "%";
    info.amountLocked = toMinPrecisionString(BNtoString(info.info.lockedTokenAmount, info.token.decimals), 5);

    info.tokenPrice = null;
    info.lockedValue = null;
    let priceInfo = calculatePrices(bnbPrice, info.pricing.token0, info.pricing.decimals0, info.pricing.reserves0, info.pricing.token1, info.pricing.decimals1, info.pricing.reserves1);
    info.tokenPrice = priceInfo.price;
    info.lockedValue = toMinPrecisionString(priceInfo.price * info.amountLocked, 5);

    let currentTime = parseInt(Date.now() / 1000);
    let lockTime = parseInt(info.info.lockTime);
    let unlockTime = parseInt(info.info.unlockTime);
    if(unlockTime < currentTime){
        info.unlocked = true;
    }else{
        let totalSeconds = unlockTime - currentTime;
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds = totalSeconds % 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds = totalSeconds % 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        info.unlocked = false;
        info.timeLeft = {
            totalSeconds, days, hours, minutes, seconds
        }
        info.timePercentThrough = (100 * (currentTime - lockTime) / (unlockTime - lockTime)).toFixed(2) + "%";
    }

    return info;
}

export async function loadLPLockInfo(web3, bnbPrice, lock){
    let contract = new web3.eth.Contract(INFO_ABI, INFO_ADR);
    let info = await contract.methods.getLPLockInfo(lock).call();

    info.supplyLocked = (100 * info.info.lockedTokenAmount / info.pairInfo.supply).toFixed(2) + "%";
    info.amountLocked = toMinPrecisionString(BNtoString(info.info.lockedTokenAmount, 18), 5);
    info.dex = FACTORIES.hasOwnProperty(info.pairInfo.factory) ? FACTORIES[info.pairInfo.factory] : "Unknown";

    info.tokenPrice = null;
    info.lockedValue = null;
    let priceInfo = calculatePrices(bnbPrice, info.token0.adr, info.token0.decimals, info.pairInfo.reserves0, info.token1.adr, info.token1.decimals, info.pairInfo.reserves1);
    info.tokenPrice = priceInfo.price;
    info.lockedValue = toMinPrecisionString(priceInfo.value * info.info.lockedTokenAmount, 5);

    let currentTime = parseInt(Date.now() / 1000);
    let lockTime = parseInt(info.info.lockTime);
    let unlockTime = parseInt(info.info.unlockTime);
    if(unlockTime < currentTime){
        info.unlocked = true;
    }else{
        let totalSeconds = unlockTime - currentTime;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds = totalSeconds % 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        info.unlocked = false;
        info.timeLeft = {
            totalSeconds, hours, minutes, seconds
        }
        info.timePercentThrough = (100 * (currentTime - lockTime) / (unlockTime - lockTime)).toFixed(2) + "%";
    }

    return info;
}

export async function approveMax(web3, from, token, spender){
    let contract = new web3.eth.Contract(BEP20_ABI, token);
    return contract.methods.approve(spender, UINT_MAX).send({from});
}

export async function createLock(factory, web3, from, token, amount, unlockTime){
    let contract = new web3.eth.Contract(FACTORY_ABI, factory);
    return contract.methods.createLock(token, amount, unlockTime).send({from, value: LOCK_FEE})
}

export function calculatePrices(bnbPrice, token0, decimals0, reserves0, token1, decimals1, reserves1){
    let price = null;
    let value = null;

    if(token0 === WBNB || token1 === WBNB){
        if(token0 === WBNB){
            price = bnbPrice * reserves0 / reserves1;
            if(decimals1 < 18){ price = price / Math.pow(10, 18 - decimals1); }
            value = BNtoString(reserves1, decimals1) * price * 2;
        }else{
            price = bnbPrice * reserves1 / reserves0;
            if(decimals0 < 18){ price = price / Math.pow(10, 18 - decimals0); }
            value = BNtoString(reserves0, decimals0) * price * 2;
        }
    }

    if(token0 === BUSD || token1 === BUSD){
        if(token0 === BUSD){
            price = reserves0 / reserves1;
            if(decimals1 < 18){ price = price / Math.pow(10, 18 - decimals1); }
            value = BNtoString(reserves1, decimals1) * price * 2;
        }else{
            price = reserves1 / reserves0;
            if(decimals0 < 18){ price = price / Math.pow(10, 18 - decimals0); }
            value = BNtoString(reserves0, decimals0) * price * 2;
        }
    }

    price = toMinPrecisionString(price, 5);
    value = toMinPrecisionString(value, 5);

    return {
        price,
        value,
    }
}



