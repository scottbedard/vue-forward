import { createApp, h } from '../src/index'
import { describe, expect, it } from 'vitest'
import { Hello, Props } from '@bedard/vue-forward-2'

describe('components', () => {
  it('use component', () => {
    const el = document.createElement('div')

    createApp('Props', { name: 'Hello world' })
      .component('Props', Props)
      .mount(el)

    expect(el.textContent).toBe('Hello world')
  })
})