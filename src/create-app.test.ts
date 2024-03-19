import { createApp, h } from '.'
import { createApp as createApp3, h as h3 } from 'vue3'
import { expect, test } from 'vitest'
import { Hello } from '@bedard/vue-forward-2'
import { Hello as Hello3 } from '@bedard/vue-forward-3'

test('hello world (render fn)', () => {
  // 2.x
  const el = document.createElement('div')
  createApp({ render: () => h('div', 'hello world') }).mount(el)

  // 3.x
  const nextEl = document.createElement('div')
  createApp3({ render: () => h3('div', 'hello world') }).mount(nextEl)

  // expect 2.x === 3.x
  expect(el.outerHTML).toBe(nextEl.outerHTML)
})

test.only('hello world (sfc)', () => {
  // 2.x
  const el = document.createElement('div')
  createApp(Hello).mount(el)

  // 3.x
  const nextEl = document.createElement('div')
  createApp3(Hello3).mount(nextEl)

  // expect 2.x === 3.x
  expect(el.outerHTML).toBe(nextEl.outerHTML)
})