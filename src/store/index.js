import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
let ls = new SecureLS({ isCompression: false });

import state from './module-example/state'
import * as getters from './module-example/getters'
import * as mutations from './module-example/mutations'
import * as actions from './module-example/actions'

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    getters,
    mutations,
    actions,
    state,
    modules: {
      // example
    },
    plugins: [
      createPersistedState({
        storage: {
          getItem: key => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: key => ls.remove(key)
        }
      })
    ],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.NODE_ENV !== 'production'
  })

  return Store
}

