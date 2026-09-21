import { useCountdown } from './lib/useCountdown'
import LockScreen from './components/LockScreen'
import Intro from './components/Intro'
import Timeline from './components/Timeline'
import Milestone from './components/Milestone'
import Closing from './components/Closing'

function App() {
  const { isLocked } = useCountdown()

  if (isLocked) return <LockScreen />

  return (
    <>
      <Intro />
      <Timeline />
      <Milestone />
      <Closing />
    </>
  )
}

export default App
