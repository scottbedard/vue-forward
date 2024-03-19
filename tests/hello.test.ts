import { createApp as createApp3, h as h3 } from 'vue3'
import { createApp, h } from '../src/index'
import { describe, expect, it } from 'vitest'
import { Hello as Hello2 } from '@bedard/vue-forward-2'
import { Hello as Hello3 } from '@bedard/vue-forward-3'

describe('Hello', () => {
  it('sfc', () => {
    const two = document.createElement('div')
    createApp(Hello2).mount(two)

    const three = document.createElement('div')
    createApp3(Hello3).mount(three)

    expect(two.outerHTML).toBe(three.outerHTML)
  })

  it('render fn', () => {
    const two = document.createElement('div')
    createApp({ render: () => h('div', 'hello world') }).mount(two)

    const three = document.createElement('div')
    createApp3({ render: () => h3('div', 'hello world') }).mount(three)

    expect(two.outerHTML).toBe(three.outerHTML)
  })
})
