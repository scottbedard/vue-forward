# `vue-forward`

[![Test](https://github.com/scottbedard/vue-forward/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/vue-forward/actions/workflows/test.yml)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/vue-forward?token=IQSd84vERj)](https://codecov.io/gh/scottbedard/vue-forward)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/vue-forward/blob/main/LICENSE)

Forward-compatible helpers to bridge the gap between Vue 2 and 3. These functions make 2.x components look and feel like 3.x, so large codebases can migrate safely and incrementally.

The basic workflow is as follows...

1. [Start from Vue 2.7](https://v2.vuejs.org/v2/guide/migration-vue-2-7)
2. Migrate root components from `new Vue(...)` to `createApp(...)`
3. Upgrade to Vue 3.1 with [compatibility flags](https://v3-migration.vuejs.org/migration-build.html)
4. Pick off errors and begin disabling 2.x compatibility
5. Upgrade to Vue latest 🎉

To get started, `npm install @bedard/vue-forward`.

## Basic usage

[Application instances](https://vuejs.org/guide/essentials/application.html#the-application-instance) are created using [`createApp`](https://vuejs.org/api/application.html#createapp).

```js
import { createApp } from '@bedard/vue-forward'

const app = createApp(RootComponent)
  .use(router)
  .mixin(i18n)

app.mount('#target')
```

There are a few things to note about these instances,

- They're isolated from each other
- They mimic 3.x as closely as possible

Here's an example component migration,

```js
// before
import Vue, { h } from 'vue'

new Vue({
  render: () => h(User, {
    props: {
      username: 'bob'
    },
    on: {
      click() {
        // ...
      }
    },
  }),
}).$mount('#app')

// after
import { createApp } from '@bedard/vue-forward'

createApp(User, {
  username: 'bob',
  onClick() {
    // ...
  },
}).mount('#app')
```

Attach to the DOM using [`mount`](https://vuejs.org/api/application.html#app-mount). This uses 3.x mouting behavior, [inserting as a child rather than replacing](https://v3-migration.vuejs.org/breaking-changes/mount-changes.html#mounted-application-does-not-replace-the-element).

```js
app.mount('#target')
```

And remove with [`unmount`](https://vuejs.org/api/application.html#app-unmount). Once an element is unmounted, it cannot be mounted again.

```js
app.unmount()
```

## Vuex

Use [`createStore`](https://vuex.vuejs.org/api/#createstore) to create a forward-compatible store. Be aware though, this object is not a `Vuex.Store`, but rather a class containing it's options. This is done to better follow the 3.x API by handling `Vue.use(Vuex)` behind the scenes.

```js
import { createApp, createStore } from '@bedard/vue-forward'

const store = createStore({ ... })

createApp(MyApp)
  .use(store)
  .mount(...)
```

If you need to access the store outside of the component tree, you'll need to instantiate it and install Vuex manually.

```js
import { createApp } from '@bedard/vue-forward'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = Vuex.Store({ ... })

createApp(MyApp)
  .use(store)
  .mount(...)
```

## License

[MIT](https://github.com/scottbedard/vue-forward/blob/main/LICENSE)
