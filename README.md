# `vue-forward`

[![Test](https://github.com/scottbedard/vue-forward/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/vue-forward/actions/workflows/test.yml)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/vue-forward?token=IQSd84vERj)](https://codecov.io/gh/scottbedard/vue-forward)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/vue-forward/blob/main/LICENSE)

Forward-compatible migration helpers to bridge the gap between Vue 2 and 3. The goal is to make 2.x components look and feel like 3.x, so large codebases can be migrated incrementally.

```js
import { createApp } from '@bedard/vue-forward'

createApp(MyApp)
  .use(router)
  .use(store)
  .mount('#app')
```

The migration workflow for this library looks like this...

1. Upgrade to Vue 2.7 ([docs](https://v2.vuejs.org/v2/guide/migration-vue-2-7))
2. Migrate root components from `new Vue(...)` to `createApp(...)`
3. Upgrade to Vue 3.1 with all compatibility flags enabled ([docs](https://v3-migration.vuejs.org/migration-build.html))
4. Pick off errors and begin disabling 2.x compatibility
5. Upgrade to Vue latest 🎉

## Getting started

No docs yet

## Basic usage

One of the largest breaking changes between 2 and 3 involves how components are instantiated and mounted to the DOM. The `createApp` function exported by this library is designed to mimic the 3.x API and behavior with 2.x components. Here is an overview of some of the changes...

- There is no more global `Vue` constructor
- Components are mounted as the child of their target, rather than replacing it
- Root components can only be mounted once
- Plugins and mixins must be installed on each app
- Props and event handlers are defined with a single object

Props are passed to a component the same as they would be in 3.x ([docs](https://vuejs.org/api/application.html#createapp)). Similarly, event handlers are provided using an `onEventName` convention ([docs](https://vuejs.org/guide/extras/render-function.html#v-on)).

```js
// before
import Vue from 'vue'

const app = new Vue(User, {
  props: {
    username: 'bob'
  },
  on: {
    click() {
      // ...
    }
  }
})
```

```js
// after
import { createApp } from '@bedard/vue-forward'

const app = createApp(User, {
  username: 'bob'
  onClick() {
    // ...
  },
})
```

Use the `mount` function to attach your component to the DOM. Be aware, <ins>this will mount using 3.x behavior</ins>. The root component will be mounted as a child of the target, rather than replacing it ([docs](https://v3-migration.vuejs.org/breaking-changes/mount-changes.html#mounted-application-does-not-replace-the-element)).

```js
app.mount('#target')
```

## Legacy mounting behavior

No docs yet

## License

[MIT](https://github.com/scottbedard/vue-forward/blob/main/LICENSE)
