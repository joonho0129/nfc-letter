import { list } from '@vercel/blob'

const MANIFEST_PATH = 'extra-photos.json'

export default async function handler(req, res) {
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 })
    if (blobs.length === 0) {
      res.status(200).json([])
      return
    }
    const data = await fetch(blobs[0].url).then((r) => r.json())
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
