import { useCountdown } from './lib/useCountdown'
import LockScreen from './components/LockScreen'
import Intro from './components/Intro'
import Timeline from './components/Timeline'
import Milestone from './components/Milestone'
import Closing from './components/Closing'
import AddMemory from './components/AddMemory'
import Verse from './components/Verse'
import BgmToggle from './components/BgmToggle'

function App() {
  const { isLocked } = useCountdown()

  // ponytail: 배포된 사이트에서 본인만 확인용 — ?preview로 잠금 무시
  const forcedOpen = new URLSearchParams(window.location.search).has('preview')

  if (isLocked && !forcedOpen) return <LockScreen />

  return (
    <>
      <BgmToggle />
      <Intro />
      <Timeline />
      <Verse />
      <Milestone />
      <AddMemory />
      <Closing />
    </>
  )
}

export default App
