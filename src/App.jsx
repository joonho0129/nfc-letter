import { lazy, Suspense } from 'react'
import { useCountdown } from './lib/useCountdown'
import LockScreen from './components/LockScreen'

// 잠금 상태에서는 이 청크(사진/코멘트/시 구절 등 실제 콘텐츠)가 아예 요청되지 않도록 지연 로드
const Intro = lazy(() => import('./components/Intro'))
const Timeline = lazy(() => import('./components/Timeline'))
const Milestone = lazy(() => import('./components/Milestone'))
const Closing = lazy(() => import('./components/Closing'))
const AddMemory = lazy(() => import('./components/AddMemory'))
const Verse = lazy(() => import('./components/Verse'))
const BgmToggle = lazy(() => import('./components/BgmToggle'))

function App() {
  const { isLocked } = useCountdown()

  // ponytail: 배포된 사이트에서 본인만 확인용 — ?preview로 잠금 무시
  const forcedOpen = new URLSearchParams(window.location.search).has('preview')

  if (isLocked && !forcedOpen) return <LockScreen />

  return (
    <Suspense fallback={null}>
      <BgmToggle />
      <Intro />
      <Timeline />
      <Verse />
      <Milestone />
      <AddMemory />
      <Closing />
    </Suspense>
  )
}

export default App
