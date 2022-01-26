import {getAllLocks, getLockHoldings, loadLPLockInfo, loadTokenLockInfo} from "@/js/locker";
import {FACTORY_ADR_TOKENS} from "@/js/constants";

export default {
    namespaced: true,
    state: () => ({
        lockList: [],
        lockInfo: {},
        holdings: {},
        holders: {},
    }),
    mutations: {
        storeLockInfo(state, {lock, info}){
            let addition = {};
            addition[lock] = info;

            state.lockInfo = {...state.lockInfo, ...addition}
        },
    },
    getters: {
        holderLocks: (state) => (holder) => {
            return state.holdings.hasOwnProperty(holder) ? state.holdings[holder] : [];
        },
        allLocks(state){
            return state.lockList;
        },
        isLoaded: (state) => (lock) => {
            return state.lockInfo.hasOwnProperty(lock);
        },
        info: (state, getters) => (lock) => {
            return getters.isLoaded(lock) ? state.lockInfo[lock] : null;
        },
    },
    actions: {
        async loadLockList(context){
            let locks = await getAllLocks(context.rootState.web3, FACTORY_ADR_TOKENS);
            context.state.lockList = locks.slice().reverse();

            for(let i=0; i<context.state.lockList.length; i++){
                await context.dispatch("loadLock", context.state.lockList[i]);
            }
        },
        async loadHolderLocks(context, holder){
            let locks = await getLockHoldings(context.rootState.web3, holder, FACTORY_ADR_TOKENS);
            context.state.holdings[holder] = locks;

            for(let i=0; i<locks.length; i++){
                if(!context.getters['isLoaded'](locks[i])){
                    await context.dispatch("loadLock", locks[i]);
                }
            }
        },
        async loadLock(context, lock){
            try {
                let info = await loadTokenLockInfo(context.rootState.web3, context.rootState.bnbPrice, lock);
                context.commit("storeLockInfo", {lock, info});
            } catch (e) { console.log(e); }
        }
    }
}