# `vue-forward`

[![Test](https://github.com/scottbedard/vue-forward/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/vue-forward/actions/workflows/test.yml)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/vue-forward?token=IQSd84vERj)](https://codecov.io/gh/scottbedard/vue-forward)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/vue-forward/blob/main/LICENSE)

These utilities mimic Vue 3 behavior using Vue 2 components, with the goal of making forward-compatibility easier.

```js
import { createApp, h } from '@bedard/vue-forward'

const app = createApp({
  render: () => h('div', 'hello world')
})

app.mount(document.body) // <div data-v-app=""><div>hello world</div></div>
```

## Getting started

No docs yet

## Props and events

No docs yet

## Legacy mounting behavior

No docs yet

## License

[MIT](https://github.com/scottbedard/vue-forward/blob/main/LICENSE)
