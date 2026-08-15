const PLACE_LABEL = (n) => `${n}位`

export default function HUD({ state, onRestart }) {
  if (!state) return null

  return (
    <>
      {state.phase !== 'finished' && (
        <div className="hud">
          <div className="hud__pill">周回 {state.lap} / {state.totalLaps}</div>
          <div className={`hud__pill hud__pill--rank rank-${state.rank}`}>{PLACE_LABEL(state.rank)} / {state.total}</div>
          <div className={`hud__pill hud__pill--speed ${state.boosting ? 'is-boosting' : ''}`}>
            {state.boosting ? '⚡ ブースト！' : `速度 ${state.speed}`}
          </div>
        </div>
      )}

      {state.phase === 'countdown' && (
        <div className="overlay overlay--countdown">
          <span className="countdown-number">{state.countdown > 0 ? state.countdown : 'GO!'}</span>
        </div>
      )}

      {state.phase === 'finished' && (
        <div className="overlay overlay--results">
          <div className="results-card">
            <h2>レース結果</h2>
            <ol className="results-list">
              {state.results.map((r) => (
                <li key={r.id} className={r.isPlayer ? 'is-player' : ''}>
                  <span className="results-place">{PLACE_LABEL(r.place)}</span>
                  <span className="results-name">{r.name}</span>
                </li>
              ))}
            </ol>
            <button className="btn-primary" onClick={onRestart}>もう一度あそぶ</button>
          </div>
        </div>
      )}
    </>
  )
}
