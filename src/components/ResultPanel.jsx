import { KIND_LABELS, CATEGORY_LABELS } from '../utils/hazard'

export default function ResultPanel({ result }) {
  if (!result) {
    return (
      <div className="result-panel result-panel--empty">
        <p>地図上をクリックするか、住所を検索すると、該当する警戒区域の有無がここに表示されます。</p>
      </div>
    )
  }

  const { label, zones } = result
  const hasZones = zones.length > 0

  return (
    <div className={`result-panel ${hasZones ? 'result-panel--warning' : 'result-panel--safe'}`}>
      <p className="result-panel__location">{label}</p>
      {hasZones ? (
        <>
          <p className="result-panel__headline">⚠ 警戒区域に該当します</p>
          <ul className="result-panel__list">
            {zones.map((z) => (
              <li key={z.properties.id}>
                {CATEGORY_LABELS[z.properties.category]} ／ {KIND_LABELS[z.properties.kind]}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="result-panel__headline">✓ サンプルデータ上では警戒区域に該当しません</p>
      )}
    </div>
  )
}
