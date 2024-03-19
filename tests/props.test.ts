import { createApp as createApp3, h as h3 } from 'vue3'
import { createApp, h } from '../src/index'
import { describe, expect, it } from 'vitest'
import { Props as Props2 } from '@bedard/vue-forward-2'
import { Props as Props3 } from '@bedard/vue-forward-3'

describe('props', () => {
  it('sfc', () => {
    const two = document.createElement('div')
    createApp(Props2, { name: 'hello' }).mount(two)

    const three = document.createElement('div')
    createApp3(Props3, { name: 'hello' }).mount(three)

    // console.log('2.x', two.outerHTML)
    // console.log('3.x', three.outerHTML)

    expect(two.textContent).toBe('hello')
    expect(three.textContent).toBe('hello')
    expect(two.outerHTML).toBe(three.outerHTML)
  })

  it.only('render', () => {
    const two = document.createElement('div')
    const twoComponent = {
      props: ['name'],
      render() { return h('div', this.name) },
    }

    createApp(twoComponent, { name: 'hello' }).mount(two)

    const three = document.createElement('div')
    const threeComponent = {
      props: ['name'],
      render() { return h3('div', this.name) },
    }

    createApp3(threeComponent, { name: 'hello' }).mount(three)

    // console.log('2.x', two.outerHTML)
    // console.log('3.x', three.outerHTML)

    expect(two.textContent).toBe('hello')
    expect(three.textContent).toBe('hello')
    expect(two.outerHTML).toBe(three.outerHTML)
  })
})
