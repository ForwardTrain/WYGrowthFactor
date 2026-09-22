import { createStore } from 'vuex'

export default createStore({
  state: {
    routerList: {},
    refreshCompany: 0,
    customerId: null,
    headLogo: 0,
    newPlan: 0,
    NavWidth: true,
    archivesMonth: 0,
    friendlyLink: 0,
    topIndex: 0,
    routeType: 0,
  },
  getters: {
    getRouterList: state => state.routerList
  },
  mutations: {
    setRouterList(state, newurl){
      state.routerList = newurl
  	},
    refreshCompany(state, newurl) {
      state.refreshCompany += 1
    },
    changeCustomerId(state, id) {
      state.customerId = id
    },
    changeHeadLogo(state) {
      state.headLogo += 1
    },
    changePlan(state) {
      state.newPlan += 1
      console.log(state.newPlan, 999999)
    },
    changeNavWidth(state, val) {
      state.NavWidth = val
    },
    setArchivesMonth(state, val) {
      state.archivesMonth += 1
    },
    setTopIndex(state, val) {
      state.topIndex = val
    },

    setRouteType(state, val) {
      state.routeType += 1
    },

    setFriendlyLink(state, val) {
      state.friendlyLink += 1
    }
  },
  actions: {
  },
  modules: {
  },
})
