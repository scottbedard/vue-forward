import { fail } from 'assert'
import { createApp, createRouter, h } from '../src/index'
import { describe, expect, it } from 'vitest'

describe('router', () => {
  it('use router', () => {
    const el = document.createElement('div')

    const router = createRouter({
      routes: [
        {
          component: { render: () => h('div', 'Hello world') },
          path: '/',
        },
      ],
    })

    createApp({ render: () => h('router-view') })
      .use(router)
      .mount(el)

    expect(el.textContent).toBe('Hello world')
  })
})
