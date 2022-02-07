import {getPresales} from "@/js/web3.js";

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
      async loadPresales({ commit }) {
          const presalesArr = (await getPresales()).map((presale) => ({
            launchType: 'PRE-SALE',
            ...presale,
          }));
          console.log('launches:', presalesArr);
          commit('setLaunchpads', presalesArr);
      }
    }
  }