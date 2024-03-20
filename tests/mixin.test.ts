import { describe, expect, it } from 'vitest'
import { createApp, h } from '../src/index'

describe('mixin', () => {
  const component = {
    render() {
      return h('div', this.hello)
    },
  }

  const mixin = {
    computed: {
      hello: () => 'hello from the mixin!'
    }
  }


  it('installs locally', () => {
    const twoA = document.createElement('div')
    const twoB = document.createElement('div')

    createApp(component)
      .mixin(mixin)
      .mount(twoA)
    
    createApp(component)
      .mount(twoB)

    expect(twoA.textContent).toBe('hello from the mixin!')
    expect(twoB.textContent).toBe('') // <- no mixin data
  })
})