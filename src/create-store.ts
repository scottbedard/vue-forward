import Vuex from 'vuex'

export class ForwardStore {
  options: any
  vuex: any

  constructor(options: ConstructorParameters<typeof Vuex.Store>[0]) {
    this.options = options
    this.vuex = Vuex
  }
}

export function createStore(options: ConstructorParameters<typeof Vuex.Store>[0]) {
  return new ForwardStore(options)
}
