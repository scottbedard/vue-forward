import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp as createApp3, h as h3 } from 'vue3'
import { createApp, h } from '../src/index'
import { noop } from 'lodash-es'

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

  it('remount', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(noop)
    const two = document.createElement('div')
    const twoApp = createApp({ render: () => h('div', 'test') })
    twoApp.mount(two)

    expect(warn).not.toHaveBeenCalled()

    twoApp.mount(two)

    expect(warn).toHaveBeenCalled()
    expect(two.innerHTML).toBe('')

    const three = document.createElement('div')
    const threeApp = createApp3({ render: () => h3('div', 'test') })
    threeApp.mount(three)
    threeApp.mount(three)

    expect(three.innerHTML).toBe(two.innerHTML)
  })
})