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

  if (isLocked) return <LockScreen />

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
