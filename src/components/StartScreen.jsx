export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <div className="start-card">
        <span className="start-card__icon" aria-hidden="true">🏎️</span>
        <h1 className="brand-font">カートダッシュ！</h1>
        <p>CPU3台と競う、3周のミニカートレース</p>
        <ul className="start-card__controls">
          <li>⌨️ ↑↓←→ または WASD で操作</li>
          <li>📱 スマホは下のボタンをタップ</li>
          <li>⚡ 黄色いパネルでブースト！</li>
        </ul>
        <button className="btn-primary" onClick={onStart}>スタート</button>
      </div>
    </div>
  )
}
