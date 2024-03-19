import Vue, { Component, defineAsyncComponent, h } from 'vue2'

export function createApp(
  component: ReturnType<typeof defineAsyncComponent> | Component,
  options: Record<string, unknown> = {},
) {
  let vm: Vue
  let mounted = false

  // wrapper element
  const containerEl = document.createElement('div')

  // component params
  const params: Record<string, any> = {
    render: () => h(component, options),
  };

  return {
    mount(target: HTMLElement | string) {
      if (mounted) {
        // eslint-disable-next-line no-console
        console.warn(`[Vue warn]: App has already been mounted.\n
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
      }

      mounted = true

      if (!vm) {
        const targetEl = typeof target === 'string'
          ? document.querySelector(target)
          : target;

        if (targetEl) {
          targetEl.innerHTML = '';
          targetEl.appendChild(containerEl);
        }
      }

      vm = new Vue(params).$mount(containerEl)

      return vm
    }
  }
}