export default {
  namespace: true,
  store: () => ({
    launchpads: [],
  }),
  mutations: {
    setLaunchpads(state, launchpads) {
      state.launchpads = [...launchpads];
    }
  },
  getters: {
    newestLaunchpads(state) {
      return state.launchpads.length !== 0 ? state.launchpads.filter((launchpad) => {
        return true;
      }) : [];
    },
    popularLaunchpads(state) {
      return state.launchpads.length !== 0 ? state.launchpads.filter((launchpad) => {
        return true;
      }) : [];
    }
  },
  actions: {
    
  }
}