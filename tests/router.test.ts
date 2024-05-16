import { describe, expect, it } from 'vitest'

import {
  createApp,
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  h,
} from '../src/index'

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

  it('history mode', () => {
    const router = createRouter({
      mode: createWebHistory(),
    })
    
    expect(router.mode).toBe('history')
  })

  it('hash mode', () => {
    const router = createRouter({
      mode: createWebHashHistory(),
    })
    
    expect(router.mode).toBe('hash')
  })

  it('memory mode', () => {
    const router = createRouter({
      mode: createMemoryHistory(),
    })
    
    expect(router.mode).toBe('abstract')
  })
})
