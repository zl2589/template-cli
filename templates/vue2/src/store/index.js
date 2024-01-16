import vuex from 'vuex'
import Vue from 'vue'

Vue.use(vuex)

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'


export default new vuex.Store({
    state,
    getters,
    mutations,
    actions,
})
