import { useState } from 'react'
import './AddMemory.css'

const MAX_WIDTH = 1400

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// 원본 카메라 사진은 여러 MB라 서버리스 함수 payload 한도를 넘을 수 있어 업로드 전에 축소
function resizeDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, MAX_WIDTH / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = reject
    img.src = dataUrl
  })
}

export default function AddMemory() {
  const [preview, setPreview] = useState(null)
  const [caption, setCaption] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [status, setStatus] = useState(null)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const raw = await fileToDataUrl(file)
    setPreview(await resizeDataUrl(raw))
    setStatus(null)
  }

  async function handleConfirm() {
    setStatus('saving')
    try {
      const res = await fetch('/api/add-memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: preview, caption }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error)
      setStatus('done')
    } catch (err) {
      setStatus('error')
      console.error(err)
    }
    setConfirming(false)
  }

  return (
    <div className="add-memory">
      <p className="add-memory-title">오늘</p>

      <label className="add-memory-picker">
        {preview ? (
          <img className="add-memory-preview" src={preview} alt="" />
        ) : (
          <span>사진 선택 (4:5)</span>
        )}
        <input type="file" accept="image/*" onChange={handleFile} hidden />
      </label>

      <input
        className="add-memory-caption"
        type="text"
        placeholder="코멘트"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button
        className="add-memory-submit"
        type="button"
        disabled={!preview || !caption || status === 'saving'}
        onClick={() => setConfirming(true)}
      >
        저장하기
      </button>

      {status === 'done' && <p className="add-memory-status">추가됐어요. 페이지 새로고침하면 보여요.</p>}
      {status === 'error' && <p className="add-memory-status">저장 실패 — 다시 시도해줘.</p>}

      {confirming && (
        <div className="add-memory-confirm-backdrop">
          <div className="add-memory-confirm">
            <p>오늘 하루를 마치겠습니까?</p>
            <div className="add-memory-confirm-actions">
              <button type="button" onClick={handleConfirm}>
                예
              </button>
              <button type="button" onClick={() => setConfirming(false)}>
                잠깐만!!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
