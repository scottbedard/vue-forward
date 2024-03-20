import { createApp as createApp3, h as h3 } from 'vue3'
import { createApp, h } from '../src/index'
import { describe, expect, it } from 'vitest'
import { Hello as Hello2 } from '@bedard/vue-forward-2'
import { Hello as Hello3 } from '@bedard/vue-forward-3'

describe('unmount', () => {
  it('2.x === 3.x', () => {
    const two = document.createElement('div')

    const twoApp = createApp(Hello2)
    twoApp.mount(two)
    twoApp.unmount()

    const three = document.createElement('div')
    const threeApp = createApp3(Hello3)
    threeApp.mount(three)
    threeApp.unmount()

    expect(two.outerHTML).toBe(three.outerHTML)
  })
})
