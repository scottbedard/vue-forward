import { createApp as createApp3, h as h3 } from 'vue3'
import { createApp, h } from '../src/index'
import { describe, expect, it } from 'vitest'
import { Hello as Hello2 } from '@bedard/vue-forward-2'
import { Hello as Hello3 } from '@bedard/vue-forward-3'


describe('mount targets', () => {
  it('string selector', () => {
    document.body.innerHTML = `
      <div id="two"></div>
      <div id="three"></div>
    `

    createApp({ render: () => h('div', 'hello') }).mount('#two')
    createApp3({ render: () => h3('div', 'hello') }).mount('#three')
    
    const two = document.getElementById('two')
    const three = document.getElementById('three')

    expect(two?.textContent).toBe('hello')
    expect(three?.textContent).toBe('hello')
    expect(two?.innerHTML).toBe(three?.innerHTML)
  })

  it('element', () => {
    const two = document.createElement('div')
    const three = document.createElement('div')

    createApp({ render: () => h('div', 'hello') }).mount(two)
    createApp3({ render: () => h3('div', 'hello') }).mount(three)

    expect(two.textContent).toBe('hello')
    expect(three.textContent).toBe('hello')
    expect(two.innerHTML).toBe(three.innerHTML)
  })
})