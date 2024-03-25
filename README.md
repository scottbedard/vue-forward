# `vue-forward`

[![Test](https://github.com/scottbedard/vue-forward/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/vue-forward/actions/workflows/test.yml)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/vue-forward?token=IQSd84vERj)](https://codecov.io/gh/scottbedard/vue-forward)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/vue-forward/blob/main/LICENSE)

Behold, the missing [`createApp`](https://vuejs.org/api/application.html#createapp) function from Vue 2.7!

Forward compatibility is key to migrating large, complex codebases. Vue 2.7 does a great job with many 3.x APIs, but doesn't include the critical `createApp`. This repo implements that function with a version that follows Vue 3 as closely as possible.

A typical migration might look like this...

1. Refactor from `new Vue(...)` to `createApp(...)`
2. Update other code that isn't forward-compatible, [see docs &rarr;](https://v3-migration.vuejs.org/breaking-changes/)
3. Upgrade to 3.1 with compatibility flags, [see docs &rarr;](https://v3-migration.vuejs.org/migration-build.html)
4. Pick off errors and remove 2.x compatibility
5. Upgrade Vue to latest, and remove this library 🎉

Now that we know the plan, `npm install @bedard/vue-forward`

## Getting started

A core concept in Vue 3 is [the application instance](https://vuejs.org/guide/essentials/application.html#the-application-instance). It's primary responsibility is to manage the root component, and install globals like directives and plugins. Here is a basic example.

```js
import { createApp } from '@bedard/vue-forward'

const app = createApp(RootComponent)
  .use(router)
  .mixin(i18n)

app.mount('#app')
```

It's impportant to note that <ins>apps are independent of one another</ins>. Another important difference is how props and listeners are defined. While migrating, you'll need to rename your events to following the 3.x naming convention.

```js
createApp(User, {
  username: 'bob',
  onClick() {
    // ...
  },
})
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
