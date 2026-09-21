import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ponytail: 로컬 dev 서버 전용 — 프로덕션 빌드엔 포함 안 됨. 배포 직전 마지막 사진 하나
// 추가하는 개인용 편의 기능이라 인증/검증 없음.
function addMemoryPlugin() {
  return {
    name: 'add-memory-api',
    configureServer(server) {
      server.middlewares.use('/api/add-memory', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          try {
            const { imageBase64, caption } = JSON.parse(body)
            const timelineDir = path.resolve(__dirname, 'src/assets/timeline')
            const dataFile = path.resolve(__dirname, 'src/data/timeline.js')

            const existingCount = fs
              .readdirSync(timelineDir)
              .filter((f) => /^\d+-/.test(f)).length
            const nextNum = existingCount + 1
            const fileName = `${String(nextNum).padStart(2, '0')}-final.jpg`
            const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '')
            fs.writeFileSync(path.join(timelineDir, fileName), Buffer.from(base64Data, 'base64'))

            const varName = 'finalPhoto'
            let content = fs.readFileSync(dataFile, 'utf-8')
            content = `import ${varName} from '../assets/timeline/${fileName}'\n${content}`
            const newEntry = `  { id: ${nextNum}, src: ${varName}, comment: ${JSON.stringify(caption)} },\n`
            content = content.replace(/\n\]\s*$/, `\n${newEntry}]\n`)
            fs.writeFileSync(dataFile, content)

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, fileName }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: String(err) }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), addMemoryPlugin()],
})
