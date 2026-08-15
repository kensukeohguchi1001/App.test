import { useCallback, useRef, useState } from 'react'
import StartScreen from './components/StartScreen'
import GameCanvas from './components/GameCanvas'
import HUD from './components/HUD'
import TouchControls from './components/TouchControls'

export default function App() {
  const [screen, setScreen] = useState('start') // start | race
  const [gameKey, setGameKey] = useState(0)
  const [raceState, setRaceState] = useState(null)
  const engineRef = useRef(null)

  const handleStateChange = useCallback((state) => setRaceState(state), [])

  function handleStart() {
    setRaceState(null)
    setScreen('race')
  }

  function handleRestart() {
    setGameKey((k) => k + 1)
    setRaceState(null)
  }

  return (
    <div className="app-wrapper">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'race' && (
        <div className="race-screen">
          <GameCanvas key={gameKey} onStateChange={handleStateChange} engineRef={engineRef} />
          <HUD state={raceState} onRestart={handleRestart} />
          <TouchControls engineRef={engineRef} />
        </div>
      )}
    </div>
  )
}
