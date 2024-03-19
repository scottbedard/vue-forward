import { createApp, h } from '.'
import { createApp as createApp3, h as h3 } from 'vue3'
import { test } from 'vitest'

test('hello world', () => {
  const el = document.createElement('div')

  createApp({
    render: () => h('div', 'hello world')
  }).mount(el)

  const nextEl = document.createElement('div')

  createApp3({
    render: () => h3('div', 'hello world')
  }).mount(nextEl)

  console.log('2.x:', el.outerHTML)
  console.log('3.x:', nextEl.outerHTML)
})