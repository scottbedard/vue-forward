import { execSync as exec } from 'child_process'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const index = path.resolve(__dirname, '../src/index.ts')
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')))

async function cli() {
  const src = String(fs.readFileSync(index)).replace('x.y.z', pkg.version)

  fs.writeFileSync(index, src)

  exec('pnpm build && pnpm publish --access public')
}

cli()
