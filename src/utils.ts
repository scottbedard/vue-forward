import Vue, { VueConstructor } from 'vue2'

export function createLocalVue(
  config: Partial<VueConstructor['config']> = {}
): VueConstructor {
  const instance: any = Vue.extend()

  Object.keys(Vue).forEach(key => {
    if (!instance.hasOwnProperty(key)) {
      const original = (Vue as any)[key]
      // cloneDeep can fail when cloning Vue instances
      // cloneDeep checks that the instance has a Symbol
      // which errors in Vue < 2.17 (https://github.com/vuejs/vue/pull/7878)
      try {
        instance[key] = typeof original === 'object' ? JSON.parse(JSON.stringify(original)) : original
      } catch (e) {
        instance[key] = original
      }
    }
  })

  // config is not enumerable
  instance.config = JSON.parse(JSON.stringify(Vue.config))

  // if a user defined errorHandler is defined by a localVue instance via createLocalVue, register it
  instance.config.errorHandler = config.errorHandler

  // option merge strategies need to be exposed by reference
  // so that merge strats registered by plugins can work properly
  instance.config.optionMergeStrategies = Vue.config.optionMergeStrategies

  // make sure all extends are based on this instance.
  // this is important so that global components registered by plugins,
  // e.g. router-link are created using the correct base constructor
  instance.options._base = instance

  // compat for vue-router < 2.7.1 where it does not allow multiple installs
  if (instance._installedPlugins && instance._installedPlugins.length) {
    instance._installedPlugins.length = 0
  }

  const use = instance.use

  instance.use = (plugin: any, ...rest: any[]) => {
    if (plugin.installed === true) {
      plugin.installed = false
    }

    if (plugin.install && plugin.install.installed === true) {
      plugin.install.installed = false
    }

    use.call(instance, plugin, ...rest)
  }

  return instance
}
