function Btn({ label, keyName, engineRef }) {
  function set(value) {
    return (e) => {
      e.preventDefault()
      engineRef.current?.setInput(keyName, value)
    }
  }
  return (
    <button
      className={`touch-btn touch-btn--${keyName}`}
      onPointerDown={set(true)}
      onPointerUp={set(false)}
      onPointerLeave={set(false)}
      onPointerCancel={set(false)}
    >
      {label}
    </button>
  )
}

export default function TouchControls({ engineRef }) {
  return (
    <div className="touch-controls">
      <div className="touch-controls__steer">
        <Btn label="◀" keyName="left" engineRef={engineRef} />
        <Btn label="▶" keyName="right" engineRef={engineRef} />
      </div>
      <div className="touch-controls__pedals">
        <Btn label="ブレーキ" keyName="down" engineRef={engineRef} />
        <Btn label="アクセル" keyName="up" engineRef={engineRef} />
      </div>
    </div>
  )
}
