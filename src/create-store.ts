import Vuex from 'vuex'
import Vue from 'vue'

export function createStore(options: ConstructorParameters<typeof Vuex.Store>[0]) {
  Vue.use(Vuex)

  return new Vuex.Store(options)
}
