import { createStore } from "vuex";

import wallet from "@/store/wallet.js";
import locks from "@/store/locks.js";
import launchpad from "@/store/launchpad.js";
import Web3 from "web3";
import { providers } from 'ethers';
import {RPC} from "@/js/constants";
import {getBNBPrice} from "@/js/utilities";
import tokenLocks from "@/store/tokenLocks";

export default createStore({
    modules: {
        wallet,
        locks,
        tokenLocks,
        launchpad,
    },
    state: {
        partner_types: [
            {
                id: 1,
                name: "Midas Calls",
                description: "Midas Calls here",
                icon: "img/icons/midas.jpg",
                twitter: "https://twitter.com/midascalls",
                instagram: "https://www.instagram.com/olympusbsc/?hl=en",
                telegram: "http://t.me/midascalls",
                envelope: "mailto:contact@olympustoken.io"
            },
            {
                id: 2,
                name: "Gollum's Gems",
                description: "Finding early and safe gems on the BSC network",
                icon: "img/icons/gollum.jpg",
                twitter: "https://mobile.twitter.com/GollumsGems",
                instagram: "https://www.instagram.com/olympusbsc/?hl=en",
                telegram: "https://t.me/gollumsgems",
                envelope: "mailto:contact@olympustoken.io"
            },
            {
                id: 3,
                name: "DefiApeTalk",
                description: "A safe space for apes to find gems",
                icon: "img/icons/defi.jpg",
                twitter: "https://mobile.twitter.com/GollumsGems",
                instagram: "https://www.instagram.com/olympusbsc/?hl=en",
                telegram: "https://t.me/gollumsgems",
                envelope: "mailto:contact@olympustoken.io"
            },
            {
                id: 4,
                name: "ApeFam",
                description: "A safe space for apes to find gems",
                icon: "img/icons/apefam.jpg",
                twitter: "https://mobile.twitter.com/ape_fam_elite",
                instagram: "https://www.instagram.com/olympusbsc/?hl=en",
                telegram: "https://t.me/ApeFamEliteCalls",
                envelope: "mailto:contact@olympustoken.io"
            },
            {
                id: 5,
                name: "Early Hunter",
                description: "A safe space for apes to find gems for Indonesia",
                icon: "img/icons/early.jpg",
                twitter: "https://mobile.twitter.com/",
                instagram: "https://www.instagram.com/olympusbsc/?hl=en",
                telegram: "https://t.me/early_hunter_IDNX",
                envelope: "mailto:contact@olympustoken.io"
            }
        ],
        launche_types: [
            {
                id: 1,
                name: "PRESALE",
                description: "The normal pre-launch. Set a date and pre-sale limit to promote and launch your project.",
            },
            // {
            //     id: 2,
            //     name: "LOTTERY-LAUNCH",
            //     description: "Run a lottery competition to allow maximum exposure but limited entries for your audience",
            // },
            // {
            //     id: 3,
            //     name: "FAIR-LAUNCH",
            //     description: "First come, first serve.The ultimate fair way to launch your project with olympus",
            // },
        ],
        partners: [],

        initialization: null,
        web3: null,
        provider: null,
        bnbPrice: null,
        nowTime: null,
        error: '',
        timerId: null, 
    },
    mutations: {
        initialize(state, initialization){
            state.initialization = initialization;
        },
        setNowTime(state, now) {
            state.nowTime = now;
        }
    },
    actions: {
        async initialize(context){
            let provider = new Web3.providers.HttpProvider(RPC);
            context.state.web3 = new Web3(provider);

            if(window.ethereum) {
                context.state.provider = new providers.Web3Provider(window.ethereum, "any");
                const network = await context.state.provider.getNetwork();
                console.log('network info: ', network, context.state.provider);
                if(network.name !== 'bnbt') {
                    context.state.error = 'This is the test version of the Olympus pre-sale platofmr. Please select Binance Test Network in Metamask to continue.'
                    return;
                }
                context.state.error = '';
            }
            else {
                context.state.error = 'This is the test version of the Olympus pre-sale platofmr. Please select Binance Test Network in Metamask to continue.';
                // context.state.provider = new providers.JsonRpcProvider(RPC);
                return;
            }
            if(context.state.timerId) {
                clearInterval(context.state.timerId);
            }
            context.state.timerId = setInterval(() => {
                context.commit('setNowTime', Date.now());
            }, 1000);

            context.state.bnbPrice = await getBNBPrice(context.state.web3);

            await context.dispatch("tokenLocks/loadLockList");
            await context.dispatch("locks/loadLockList");

        },
    },
    getters: {
        verifiedByParter: (state) => {
            if (state.launches) {
                return state.launches.filter((launche) => {
                return typeof(launche.partnerType) == "number";
                })
            }
        },
        partnerType1Launches: (state) => {
            if (state.launches) {
                return state.launches.filter((launche) => {
                return launche.partnerType == 1;
                })
            }
        },
        partnerType2Launches: (state) => {
            if (state.launches) {
                return state.launches.filter((launche) => {
                return launche.partnerType == 2;
                })
            }
        },
        partnerType3Launches: (state) => {
            if (state.launches) {
                return state.launches.filter((launche) => {
                return launche.partnerType == 3;
                })
            }
        },
        partnerType4Launches: (state) => {
            if (state.launches) {
                return state.launches.filter((launche) => {
                return launche.partnerType == 4;
                })
            }
        },
      }
});
