import { createApp as createApp3, h as h3 } from 'vue3'
import { createApp } from '../src/index'
import { describe, expect, it, vi } from 'vitest'
import { EventListener as EventListener2 } from '@bedard/vue-forward-2'
import { EventListener as EventListener3 } from '@bedard/vue-forward-3'

describe('event listener', () => {
  it('sfc - 2.x', () => {
    const el = document.createElement('div')
    const click = new MouseEvent('click')
    const onClick = vi.fn()

    createApp(EventListener2, { onClick }).mount(el)

    el.querySelector('button')?.dispatchEvent(click)

    expect(onClick).toHaveBeenCalledWith(click)
  })

  it('sfc - 3.x', () => {
    const el = document.createElement('div')
    const click = new MouseEvent('click')
    const onClick = vi.fn()
    
    createApp3(EventListener3, { onClick }).mount(el)

    el.querySelector('button')?.dispatchEvent(click)

    expect(onClick).toHaveBeenCalledWith(click)
  })
})
