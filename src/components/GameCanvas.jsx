import { useEffect, useRef } from 'react'
import { RaceEngine } from '../game/engine'

const KEY_MAP = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyW: 'up',
  KeyS: 'down',
  KeyA: 'left',
  KeyD: 'right',
}

export default function GameCanvas({ onStateChange, engineRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    function resize() {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const engine = new RaceEngine(canvas, onStateChange)
    engineRef.current = engine
    engine.start()

    function handleKey(e, value) {
      const key = KEY_MAP[e.code]
      if (key) {
        engine.setInput(key, value)
        e.preventDefault()
      }
    }
    const onKeyDown = (e) => handleKey(e, true)
    const onKeyUp = (e) => handleKey(e, false)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      engine.stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      engineRef.current = null
    }
  }, [onStateChange, engineRef])

  return <canvas ref={canvasRef} className="game-canvas" />
}
