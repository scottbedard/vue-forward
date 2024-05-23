# `vue-forward`

[![Test](https://github.com/scottbedard/vue-forward/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/vue-forward/actions/workflows/test.yml)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/vue-forward?token=IQSd84vERj)](https://codecov.io/gh/scottbedard/vue-forward)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fvue-forward?style=flat-square)](https://www.npmjs.com/package/@bedard/vue-forward)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/vue-forward/blob/main/LICENSE)

Behold, the missing [`createApp`](https://vuejs.org/api/application.html#createapp) function from Vue 2.7!

Forward compatibility is key to migrating large, complex codebases. Vue 2.7 provides many 3.x features, but it's missing the critical `createApp` function! This project implements that function while following 3.x as closely as possible.

A typical migration might look like this...

1. Refactor from `new Vue(...)` to `createApp(...)`
2. Migrate anything else that isn't forward-compatible, [see here &rarr;](https://v3-migration.vuejs.org/breaking-changes/)
3. Upgrade to 3.1 and remove this library 🎉

Now that we know the plan, `npm install @bedard/vue-forward`

## Getting started

A core concept in Vue 3 is [the application instance](https://vuejs.org/guide/essentials/application.html#the-application-instance). It's responsible for the root component and registering any globals. Here we'll use it to create a component tree and mount it to the DOM.

```js
import { createApp } from '@bedard/vue-forward'

const app = createApp(App)
  .use(router)
  .mixin(i18n)

app.mount('#app')
```

For any root props or event listeners, we'll use the same naming conventions as Vue 3.

```js
createApp(User, {
  username: 'bob',
  onClick() {
    // ...
  },
})
```

Attach to the DOM using [`mount`](https://vuejs.org/api/application.html#app-mount). This uses [3.x mouting behavior](https://v3-migration.vuejs.org/breaking-changes/mount-changes.html#mounted-application-does-not-replace-the-element), inserting as a child node rather than replacing the target.

```js
app.mount('#target')
```

Call [`unmount`](https://vuejs.org/api/application.html#app-unmount) to destroy the instance. Once unmounted, an app cannot be mounted again.

```js
app.unmount()
```

## Vuex & Vue Router

Use [`createStore`](https://vuex.vuejs.org/api/#createstore) and [`createRouter`]() to create a forward compatible stores and routers.

```js
import { createApp, createRouter, createStore, createWebHistory } from '@bedard/vue-forward'

const router = createRouter({
  history: createWebHistory(),
  routes: [ ... ],
})

const store = createStore({
  state: { ... }
})

createApp(App)
  .use(store)
  .use(router)
```

## License

[MIT](https://github.com/scottbedard/vue-forward/blob/main/LICENSE)
