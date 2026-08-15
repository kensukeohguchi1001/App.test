import { KIND_LABELS, CATEGORY_LABELS, CATEGORY_COLORS } from '../utils/hazard'

export default function ResultPanel({ result }) {
  if (!result) {
    return (
      <div className="result-panel result-panel--empty">
        <span className="result-panel__icon" aria-hidden="true">🗺️</span>
        <p>地図をタップするか、住所を検索すると、警戒区域の該当有無がここに表示されます。</p>
      </div>
    )
  }

  const { label, zones } = result
  const hasZones = zones.length > 0

  return (
    <div className={`result-panel ${hasZones ? 'result-panel--warning' : 'result-panel--safe'}`}>
      <p className="result-panel__location">{label}</p>
      <div className="result-panel__status">
        <span className="result-panel__status-icon" aria-hidden="true">{hasZones ? '⚠️' : '✅'}</span>
        <p className="result-panel__headline">
          {hasZones ? '警戒区域に該当します' : 'サンプルデータ上では該当なし'}
        </p>
      </div>
      {hasZones && (
        <ul className="result-panel__tags">
          {zones.map((z) => (
            <li key={z.properties.id} className="result-panel__tag">
              <span
                className="result-panel__tag-dot"
                style={{ background: CATEGORY_COLORS[z.properties.category] }}
                aria-hidden="true"
              />
              {CATEGORY_LABELS[z.properties.category]} ／ {KIND_LABELS[z.properties.kind]}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
