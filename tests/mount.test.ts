import { createApp as createApp3, h as h3 } from 'vue3'
import { createApp, h } from '../src/index'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('mount', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('selector', () => {
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

  it('remount warning', () => {
    const warn = vi.spyOn(console, 'warn')
    const app = createApp({ render: () => h('div') })

    app.mount(document.createElement('div'))

    expect(warn).not.toHaveBeenCalled()
    
    app.mount(document.createElement('div'))

    expect(warn).toHaveBeenCalled()
  })
})