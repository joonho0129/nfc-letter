import { useEffect, useRef, useState } from 'react'
import './BgmToggle.css'

// ponytail: public/bgm.mp3 필요 — 없으면 버튼만 있고 소리는 안 남
export default function BgmToggle() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    // iOS Safari는 진짜 사용자 제스처 없이는 소리 재생을 막아서,
    // 화면 첫 터치를 감지해 그 순간 바로 재생 (거의 자동재생처럼 느껴지게)
    function startOnFirstTouch() {
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
      document.removeEventListener('pointerdown', startOnFirstTouch)
    }
    document.addEventListener('pointerdown', startOnFirstTouch)
    return () => document.removeEventListener('pointerdown', startOnFirstTouch)
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
