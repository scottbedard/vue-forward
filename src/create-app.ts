import Vue, { Component, defineAsyncComponent, h } from 'vue2'

export function createApp(
  component: ReturnType<typeof defineAsyncComponent> | Component,
  props: Record<string, unknown> = {},
) {
  let vm: Vue
  let mounted = false

  // wrapper element
  const containerEl = document.createElement('div')
  containerEl.dataset.vApp = ''

  // component params
  const params: Record<string, any> = {
    render: () => h(component, {
      props,
    }),
  };

  return {
    mount(target: HTMLElement | string) {
      // log 3.x warning if already mounted
      if (mounted) {
        console.warn(`[Vue warn]: App has already been mounted.\n
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
      }

      mounted = true

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

      // instantiate and mount component
      vm = new Vue(params).$mount(containerEl)

      // return component instance
      return vm.$children[0]
    }
  }
}