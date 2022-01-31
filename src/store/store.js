import { createStore } from "vuex";

import wallet from "@/store/wallet.js";
import locks from "@/store/locks.js";
import launchpad from "@/store/launchpad.js";
import Web3 from "web3";
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
                name: "DEFIAPETALK",
                description: "A safe space for apes to find gems",
                icon: "img/icons/defiapetalk.png"
            },
            {
                id: 2,
                name: "MAD LAB CRYPTO",
                description: "Allowing crypto enthusiasts to experiment safely",
                icon: "img/icons/madlab.png"
            },
            {
                id: 3,
                name: "GOLLUM'S GEMS",
                description: "Finding early and safe gems on the BSC network",
                icon: "img/icons/gollum.png"
            },
            {
                id: 4,
                name: "SMOL CALLS",
                description: "Dropping projects and calls Looking for the Gems early",
                icon: "img/icons/smalcalls.png"
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
        bnbPrice: null,
        nowTime: null,
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
            
            setInterval(() => {
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
