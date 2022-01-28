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
      newestLaunchpads(state) {
        return state.launches.length !== 0 ? state.launches.filter((launche) => {
          return true;
        }) : [];
      },
      popularLaunchpads(state) {
        return state.launches.length !== 0 ? state.launches.filter((launche) => {
          return true;
        }) : [];
      },
    },
    actions: {
      async loadPresales({ commit }) {
          const presalesArr = await getPresales();
          commit('setLaunchpads', presalesArr);
      }
    }
  }