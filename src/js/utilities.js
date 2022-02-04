import {BNB_BUSD_PAIR_ADR, PAIR_ABI_MIN} from "@/js/constants";

export async function getBNBPrice(web3){
    try {
        let contract = new web3.eth.Contract(PAIR_ABI_MIN, BNB_BUSD_PAIR_ADR);
        let info = await contract.methods.getReserves().call();
        return info.reserve1 / info.reserve0;
    }catch(e) {
        console.log('Error in getBNBPrice in web3.js:', e);
    }
}

export function BNtoString(bn, decimals, minPrecision=18){
    let str = bn.toString();
    let padding = decimals - str.length;

    if(padding >= 0){
        for(let i=0; i<padding; i++){
            str = "0" + str;
        }
        str = "0." + str;
    }else{
        let formatted = "";
        for(let i=0; i<str.length; i++){
            if(i === -padding){
                formatted = formatted + ".";
            }
            formatted = formatted + str[i];
        }
        str = formatted;
    }

    let trimmed = "";
    let inDecimals = false;
    let pastLeading = false;
    let precisionCounter = 0;
    for(let i=0; i<str.length; i++){
        if(str[i] === "."){
            if(precisionCounter >= minPrecision){
                break;
            }else{
                inDecimals = true;
            }
        }else{
            if(!pastLeading && str[i] !== "0"){ pastLeading = true; }

            if(pastLeading){
                precisionCounter++;
            }
        }
        trimmed += str[i];

        if(precisionCounter === minPrecision && inDecimals){ break; }
    }

    return trimmed;
}

export function stringToBN(num, decimals){
    let str = num.toString();
    let full = "";
    let remaining = decimals;
    let pastDecimals = false;

    for(let i=0; i<str.length; i++){
        if(str[i] === "."){
            pastDecimals = true;
        }else{
            full = full + str[i];
            if(pastDecimals){ remaining--; }
        }
    }

    for(let i=0; i<remaining; i++){
        full = full + "0";
    }

    return full;
}

export function toMinPrecisionString(value, precision) {
    if (!value) {
        return "0";
    }
    value = parseFloat(value).toFixed(18);

    let trimmed = "";
    let inDecimals = false;
    let pastLeading = false;
    let precisionCounter = 0;

    for (let i = 0; i < value.length; i++) {
        if (value[i] === ".") {
            if (precisionCounter >= precision) {
                break;
            } else {
                inDecimals = true;
            }
        } else {
            if (!pastLeading && value[i] !== "0") {
                pastLeading = true;
            }

            if (pastLeading) {
                precisionCounter++;
            }
        }
        trimmed += value[i];

        if (precisionCounter === precision && inDecimals) {
            break;
        }
    }

    return trimmed;
}