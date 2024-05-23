import VueRouter from 'vue-router'
import Vue from 'vue'

type CreateRouterParams = Omit<ConstructorParameters<typeof VueRouter>[0], 'mode'> & {
  history: 'abstract' | 'history' | 'hash'
}

export function createRouter(options: CreateRouterParams) {
  Vue.use(VueRouter)

  return new VueRouter({ ...options, mode: options.history })
}

export function createMemoryHistory() {
  return 'abstract' as const
}

export function createWebHistory() {
  return 'history' as const
}

export function createWebHashHistory() {
  return 'hash' as const
}
