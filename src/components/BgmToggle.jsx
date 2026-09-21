import { useEffect, useRef, useState } from 'react'
import './BgmToggle.css'

// ponytail: src/assets/bgm.mp3 파일 추가 필요 — 없으면 버튼만 있고 소리는 안 남
export default function BgmToggle() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/bgm.mp3" loop />
      <button className="bgm-toggle" type="button" onClick={toggle} aria-label={playing ? '음악 끄기' : '음악 켜기'}>
        <span className={playing ? 'bgm-icon bgm-icon-playing' : 'bgm-icon'}>♪</span>
      </button>
    </>
  )
}
