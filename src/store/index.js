import {
  createStore,
  createLogger
} from 'vuex'
import * as getters from './getters'
import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'
const debug = process.env.NODE_ENV !== 'production'
export default createStore({
  state,
  mutations,
  getters,
  actions,
  plugins: debug ? [createLogger()] : []
})
