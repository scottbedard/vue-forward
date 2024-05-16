import VueRouter from 'vue-router'
import Vue from 'vue'

export function createRouter(options: ConstructorParameters<typeof VueRouter>[0]) {
  Vue.use(VueRouter)

  return new VueRouter(options)
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
