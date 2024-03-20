import { createApp as createApp3, h as h3 } from 'vue3'
import { createApp, h } from '../src/index'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('mixin', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const component2 = {
    render() {
      return h('div', this.hello)
    },
  }

  const component3 = {
    render() {
      return h3('div', this.hello)
    },
  }

  const mixin = {
    computed: {
      hello: () => 'hello from the mixin!'
    }
  }

  it('installs locally', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    // 2.x
    const twoA = document.createElement('div')
    const twoB = document.createElement('div')

    createApp(component2)
      .mixin(mixin)
      .mount(twoA)
    
    createApp(component2)
      .mount(twoB)

    expect(twoA.textContent).toBe('hello from the mixin!')
    expect(twoB.textContent).toBe('') // <- no mixin data

    // 3.x
    const threeA = document.createElement('div')
    const threeB = document.createElement('div')

    createApp3(component3)
      .mixin(mixin)
      .mount(threeA)

    createApp3(component3)
      .mount(threeB)

    expect(threeA.textContent).toBe('hello from the mixin!')
    expect(threeB.textContent).toBe('') // <- no mixin data

    // 2.x === 3.x
    expect(twoA.outerHTML).toBe(threeA.outerHTML)
  })
})