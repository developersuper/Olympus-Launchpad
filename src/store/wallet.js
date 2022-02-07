import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { providers } from 'ethers';
import { BNtoString } from "@/js/utilities.js";

export default {
    namespaced: true, 
    state: () => ({
        web3: null,
        provider: null,
        address: null,
        balance: null,
        tokens: [],
        balances: {},
    }),
    mutations: {
        connectWeb3(state, web3){
            state.web3 = web3;
        },
        loadAccount(state, {address, balance}){
            state.address = address;
            state.balance = balance;
            state.tokens = [];
            state.balances = {};
            window.localStorage.setItem("connectWallet", "true");
        },
        disconnectWallet(state){
            state.web3 = null;
            state.address = null;
            state.balance = null;
            state.tokens = [];
            state.balances = {};
            window.localStorage.setItem("connectWallet", "");
            location.reload();
        }
    },
    getters: {
        isWalletConnected(state, getters){
            return getters.address !== null;
        },
        web3(state){
            return state.web3;
        },
        address(state){
            return state.address;
        },
        provider(state) {
            return state.provider;
        },
        addressPreviewShort(state){
            return state.address.substr(0,6);
        },
        addressPreviewLong(state){
            return state.address.substr(0,5) + "..." + state.address.substr(-4);
        },
        balance(state){
            return BNtoString(state.balance, 18);
        },
        balanceBN(state){
            return state.balance;
        },
    },
    actions: {
        async loadAccount({getters, commit}){
            let accounts = await getters.web3.eth.getAccounts();
            let address = accounts[0];
            let balance = await getters.web3.eth.getBalance(address);

            commit("loadAccount", {address, balance});
        },
        async connectWallet({state, commit, dispatch, rootState}){
            const providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                        rpc: {
                            56: rootState.RPC
                        }
                    }
                }
            }

            const web3Modal = new Web3Modal({
                providerOptions, // required
                cacheProvider: false, // optional
            })

            let provider = await web3Modal.connect();

            let web3 = new Web3(provider);

            if(window.ethereum) {
                state.provider = new providers.Web3Provider(window.ethereum, "any"); 
            }else state.provider = provider;

            commit("connectWeb3", web3);

            provider.on('accountsChanged', () => {
                dispatch("loadAccount");
            })

            provider.on('disconnect', () => {
                commit("disconnectWallet");
            })

            await dispatch("loadAccount");

            // dispatch("locks/loadHolderLocks", state.address, {root:true});
            // dispatch("tokenLocks/loadHolderLocks", state.address, {root:true});
        }
    }
}