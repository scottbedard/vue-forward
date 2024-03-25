import VueRouter from 'vue-router'
import Vue from 'vue'

export function createRouter(options: ConstructorParameters<typeof VueRouter>[0]) {
  Vue.use(VueRouter)

  return new VueRouter(options)
}
