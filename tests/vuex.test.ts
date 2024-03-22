import { createApp, createStore, h } from '../src/index'
import { describe, expect, it } from 'vitest'

describe('vuex', () => {
  it('use store', () => {
    const el = document.createElement('div')

    const store = createStore({
      state: {
        message: 'Wubba Lubba Dub Dub',
      },
    })

    createApp({
        render() {
          return h('div', this.$store?.state.message)
        },
      })
      .use(store)
      .mount(el)

    expect(el.textContent).toBe('Wubba Lubba Dub Dub')

    // other app instances should not have vuex installed
    const isolated = document.createElement('div')

    createApp({
        render() {
          return h('div', this.$store?.state.message)
        },
      })
      .mount(isolated)
      
    expect(isolated.textContent).toBe('')
  })
})
