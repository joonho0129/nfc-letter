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

  // ponytail: 배포 전 마지막 사진 추가용 숨김 페이지, 링크로 노출 안 함
  if (new URLSearchParams(window.location.search).has('add-memory')) {
    return <AddMemory />
  }

  if (isLocked) return <LockScreen />

  return (
    <>
      <BgmToggle />
      <Intro />
      <Timeline />
      <Verse />
      <Milestone />
      <Closing />
    </>
  )
}

export default App
