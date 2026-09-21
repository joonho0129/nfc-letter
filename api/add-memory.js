import { put, list } from '@vercel/blob'

const MANIFEST_PATH = 'extra-photos.json'

async function readManifest() {
  const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 })
  if (blobs.length === 0) return []
  const res = await fetch(blobs[0].url)
  return res.json()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  try {
    const { imageBase64, caption } = req.body
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    const photoBlob = await put(`extra-${Date.now()}.jpg`, buffer, {
      access: 'public',
      contentType: 'image/jpeg',
    })

    const existing = await readManifest()
    const updated = [...existing, { url: photoBlob.url, caption }]

    await put(MANIFEST_PATH, JSON.stringify(updated), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true,
    })

    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) })
  }
}
