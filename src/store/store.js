import { createStore } from "vuex";

import wallet from "@/store/wallet.js";
import locks from "@/store/locks.js";
import Web3 from "web3";
import {getAllLocks, loadLPLockInfo} from "@/js/locker";
import {RPC} from "@/js/constants";
import {getBNBPrice} from "@/js/utilities";
import tokenLocks from "@/store/tokenLocks";
import {getPresales} from "@/js/web3.js";

export default createStore({
    modules: {
        wallet,
        locks,
        tokenLocks,
    },
    state: {
        // launches: [
        //     {
        //         id: 1,
        //         name: "Olympus",
        //         icon: "img/icons/olympus.svg",
        //         isLive: true,
        //         isPublic: false,
        //         isOwned: false,
        //         ratio: 100,
        //         participants: 53,
        //         progress: 71,
        //         launchType: "Pre-sale",
        //         partnerType: 1,
        //         startDate: "2020-11-01T12:30:00.000Z",
        //         endDate: "2021-03-07T23:13:34.000Z",
        //     },
        //     {
        //         id: 2,
        //         name: "Zeus",
        //         icon: "img/icons/bnb.svg",
        //         isLive: false,
        //         isPublic: false,
        //         isOwned: false,
        //         ratio: 1231,
        //         participants: 23,
        //         progress: 30,
        //         launchType: "Lottery",
        //         partnerType: 3,
        //         startDate: "2021-11-01T02:30:11.000Z",
        //         endDate: "2021-12-01T23:13:34.000Z",
        //     },
        //     {
        //         id: 3,
        //         name: "Goldok",
        //         icon: "img/icons/Pie.svg",
        //         isLive: true,
        //         isPublic: true,
        //         isOwned: false,
        //         ratio: 100,
        //         participants: 45,
        //         progress: 62,
        //         launchType: "Fair",
        //         startDate: "2021-12-01T14:30:11.000Z",
        //         endDate: "2021-12-31T23:13:34.000Z",
        //     },
        //     {
        //         id: 4,
        //         name: "Jessy",
        //         icon: "img/icons/Pie.svg",
        //         isLive: false,
        //         isPublic: true,
        //         isOwned: true,
        //         ratio: 2342,
        //         participants: 123,
        //         progress: 91,
        //         launchType: "Fair",
        //         partnerType: 4,
        //         startDate: "2020-11-01T12:30:00.000Z",
        //         endDate: "2021-01-01T23:13:34.000Z",
        //     },
        //     {
        //         id: 5,
        //         name: "Hinadoru",
        //         icon: "img/icons/bnb.svg",
        //         isLive: false,
        //         isPublic: false,
        //         isOwned: true,
        //         ratio: 12312,
        //         participants: 34,
        //         progress: 47,
        //         launchType: "Pre-sale",
        //         startDate: "2021-12-01T14:30:11.000Z",
        //         endDate: "2021-12-31T23:13:34.000Z",
        //     },
        //     {
        //         id: 6,
        //         name: "Tesseus",
        //         icon: "img/icons/olympus.svg",
        //         isLive: true,
        //         isPublic: true,
        //         isOwned: true,
        //         ratio: 45446,
        //         participants: 37,
        //         progress: 75,
        //         launchType: "Lottery",
        //         partnerType: 2,
        //         startDate: "2021-11-01T02:30:11.000Z",
        //         endDate: "2021-12-01T23:13:34.000Z",
        //     },
        //     {
        //         id: 7,
        //         name: "Dema",
        //         icon: "img/icons/olympus.svg",
        //         isLive: false,
        //         isPublic: true,
        //         isOwned: true,
        //         ratio: 100,
        //         participants: 90,
        //         progress: 50,
        //         launchType: "Pre-sale",
        //         partnerType: 3,
        //         startDate: "2021-12-01T14:30:11.000Z",
        //         endDate: "2021-12-18T23:13:34.000Z",
        //     },
        //     {
        //         id: 8,
        //         name: "Poky",
        //         icon: "img/icons/Pie.svg",
        //         isLive: true,
        //         isPublic: false,
        //         isOwned: false,
        //         ratio: 123,
        //         participants: 22,
        //         progress: 11,
        //         launchType: "Lottery",
        //         startDate: "2021-12-01T14:30:11.000Z",
        //         endDate: "2021-12-19T23:13:34.000Z",
        //     },
        //     {
        //         id: 9,
        //         name: "Kara",
        //         icon: "img/icons/olympus.svg",
        //         isLive: false,
        //         isPublic: false,
        //         isOwned: true,
        //         ratio: 2312,
        //         participants: 16,
        //         progress: 34,
        //         launchType: "Fair",
        //         startDate: "2021-11-01T02:30:11.000Z",
        //         endDate: "2021-12-01T23:13:34.000Z",
        //     },
        //     {
        //         id: 10,
        //         name: "Judy",
        //         icon: "img/icons/bnb.svg",
        //         isLive: true,
        //         isPublic: true,
        //         isOwned: true,
        //         ratio: 100,
        //         participants: 55,
        //         progress: 12,
        //         launchType: "Pre-sale",
        //         partnerType: 1,
        //         startDate: "2020-11-01T12:30:00.000Z",
        //         endDate: "2021-01-01T23:13:34.000Z",
        //     },
        //     {
        //         id: 11,
        //         name: "Andy",
        //         icon: "img/icons/olympus.svg",
        //         isLive: false,
        //         isPublic: false,
        //         isOwned: false,
        //         ratio: 111,
        //         participants: 89,
        //         progress: 67,
        //         launchType: "Fair",
        //         startDate: "2021-12-01T02:30:11.000Z",
        //         endDate: "2021-12-29T23:13:34.000Z",
        //     },

        // ],
        launches: [],
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
                name: "PRE-LAUNCH",
                description: "The normal pre-launch. Set a date and pre-sale limit to promote and launch your project.",
            },
            {
                id: 2,
                name: "LOTTERY-LAUNCH",
                description: "Run a lottery competition to allow maximum exposure but limited entries for your audience",
            },
            {
                id: 3,
                name: "FAIR-LAUNCH",
                description: "First come, first serve.The ultimate fair way to launch your project with olympus",
            },
        ],
        enable_whitelisted_list: [
            {
                id: 1,
                address: "0x5bDacBaE440A2F30af96147DE964CC97FE283305",
            },
            {
                id: 2,
                address: "0xa96D2F0978E317e7a97aDFf7b5A76F4600916021",
            },
            {
                id: 3,
                address: "0x95478C4F7D22D1048F46100001c2C69D2BA57380",
            },
            {
                id: 4,
                address: "0xC0E2830724C946a6748dDFE09753613cd38f6767",
            },
            {
                id: 5,
                address: "0x3293cB515Dbc8E0A8Ab83f1E5F5f3CC2F6bbc7ba",
            },
            {
                id: 6,
                address: "0xffFfBBB50c131E664Ef375421094995C59808c97",
            },
            {
                id: 7,
                address: "0x02517411F32ac2481753aD3045cA19D58e448A01",
            },
            {
                id: 8,
                address: "0xf332789fae0d1d6f058bfb040b3c060d76d06574",
            },
            {
                id: 9,
                address: "0xdFf234670038dEfB2115Cf103F86dA5fB7CfD2D2",
            },
            {
                id: 10,
                address: "0x224002428cF0BA45590e0022DF4b06653058F22F",
            },

        ],

        initialization: null,
        web3: null,
        bnbPrice: null,
    },
    mutations: {
        initialize(state, initialization){
            state.initialization = initialization;
        }
    },
    actions: {
        async initialize(context){
            let provider = new Web3.providers.HttpProvider(RPC);
            context.state.web3 = new Web3(provider);

            context.state.bnbPrice = await getBNBPrice(context.state.web3);
            context.state.launches.push(await getPresales());

            await context.dispatch("tokenLocks/loadLockList");
            await context.dispatch("locks/loadLockList");

            console.log("This is my result--------", context.state.launches)
            console.log(context.getters["tokenLocks/allLocks"])
            console.log(context.getters["locks/allLocks"])
        }
    },
    getters: {
        myLaunches: (state) => {
            if (state.launches) {
                return state.launches.filter((launche) => {
                return launche.isOwned == true;
                })
            }
        },
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
