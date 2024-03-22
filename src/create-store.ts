import Vuex from 'vuex'

export class Store {
  options: any

  vuex: any

  constructor(options: ConstructorParameters<typeof Vuex.Store>[0]) {
    this.options = options
    this.vuex = Vuex
  }
}

export function createStore(options: ConstructorParameters<typeof Vuex.Store>[0]) {
  return new Store(options)
}
