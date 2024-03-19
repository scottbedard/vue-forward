import { h as h2 } from 'vue2'

export function h(...args: any[]) {
  console.log('hey', ...args)
  return h2(...args)
}
