import { useCountdown } from './lib/useCountdown'
import LockScreen from './components/LockScreen'

function App() {
  const { isLocked } = useCountdown()

  if (isLocked) return <LockScreen />

  // ponytail: 타임라인/갤러리 등 실제 콘텐츠는 2~4일차에서 채워 넣는다
  return <div style={{ padding: '2rem' }}>오픈됐어요 🎉 (콘텐츠는 다음 작업일에 추가 예정)</div>
}

export default App
