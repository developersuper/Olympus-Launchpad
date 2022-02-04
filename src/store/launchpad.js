import {getPresales} from "@/js/web3.js";

// const launches = [
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

// ]

export default {
    namespaced: true,
    state: () => ({
        launches: [],
    }),
    mutations: {
      setLaunchpads(state, presalesArr) {
        state.launches = [...presalesArr];
      }
    },
    getters: {
      launchesIn24H(state) {
        return state.launches.filter((launch) => {
          return (Date.now() - launch.createdAt.getTime()) < 24 * 3600000;
        }).length;
      },
      totalProjects(state) {
        return state.launches.length;
      },
    },
    actions: {
      async loadPresales({ commit }, provider) {
          const presalesArr = (await getPresales(provider)).map((presale) => ({
            launchType: 'PRE-SALE',
            ...presale,
          }));
          console.log('launches:', presalesArr);
          commit('setLaunchpads', presalesArr);
      }
    }
  }