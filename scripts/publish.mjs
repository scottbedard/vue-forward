import { execSync as exec } from 'child_process'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import pkg from '../package.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const index = path.resolve(__dirname, '../src/index.ts')

async function cli() {
  const src = String(fs.readFileSync(index)).replace('x.y.z', pkg.version)

  fs.writeFileSync(index, src)

  exec('pnpm build && pnpm publish')
}

if (require.main === module) {
  cli()
}
