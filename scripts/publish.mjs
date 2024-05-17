import { execSync as exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import pkg from '../package.json'

const indexPath = path.resolve(__dirname, '../src/index.ts')

async function cli() {
  const src = String(fs.readFileSync(indexPath)).replace('x.y.z', pkg.version)

  fs.writeFileSync(indexPath, src)

  exec('pnpm build && pnpm publish')
}

if (require.main === module) {
  cli()
}
