import { camelCase, kebabCase } from 'lodash-es'
import { createLocalVue } from './utils'
import Vue, { Component, defineAsyncComponent, defineComponent, h } from 'vue2'

export function createApp(
  options: ReturnType<typeof defineAsyncComponent> | Component,
  props: Record<string, unknown> = {},
) {
  const LocalVue = createLocalVue()
  let vm: Vue
  let mounted = false

  // wrapper element
  const containerEl = document.createElement('div')
  containerEl.dataset.vApp = ''

  // normalize event listeners
  const on = Object.keys(props)
    .filter(key => key.startsWith('on') && typeof props[key] === 'function' && key.length > 2)
    .reduce((acc, key) => {
      acc[key.slice(2).split(':').map(name => camelCase(name)).join(':')] = props[key]
      acc[key.slice(2).split(':').map(name => kebabCase(name)).join(':')] = props[key]
      return acc
    }, {} as any);

  // component params  
  const component = defineComponent({
    render: () => h(options, { on, props }),
  })

  const app = {
    mixin(obj: any) {
      LocalVue.mixin(obj)
      
      return app
    },
    mount(target: HTMLElement | string) {
      // create or replace target element
      if (!vm) {
        const targetEl = typeof target === 'string'
          ? document.querySelector(target)
          : target;

        if (targetEl) {
          targetEl.innerHTML = '';
          targetEl.appendChild(containerEl);
        }

        // attach 3.x root attribute to target el
        targetEl.setAttribute('data-v-app', '')
      }

      // clear target if already mounted
      if (mounted) {
        console.warn(`[Vue warn]: App has already been mounted.\n
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);

        vm.$el.remove()
        return
      }

      mounted = true

      // instantiate and mount component
      vm = new LocalVue(component).$mount(containerEl)

      // return component instance
      return vm.$children[0]
    },
    unmount() {
      if (vm) {
        vm.$destroy()
        vm.$el.remove()
      }
    }
  }

  return app
}