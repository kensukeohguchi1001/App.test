import { useParams, useNavigate } from 'react-router-dom'
import { getRestaurantById } from '../data/restaurants'

// Notesのアイコンマッピング
function noteIcon(note) {
  const n = note.toLowerCase()
  if (n.includes('cash')) return '💴'
  if (n.includes('english')) return '🇬🇧'
  if (n.includes('reservation')) return '📅'
  if (n.includes('small')) return '🏠'
  if (n.includes('solo')) return '🧍'
  if (n.includes('couple')) return '💑'
  if (n.includes('group')) return '👥'
  if (n.includes('busy') || n.includes('queue')) return '⏱️'
  if (n.includes('closed') || n.includes('open')) return '🕒'
  return 'ℹ️'
}

export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurant = getRestaurantById(id)

  // IDが見つからない場合
  if (!restaurant) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🍽️</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', marginBottom: '12px' }}>
          Restaurant not found
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          This restaurant doesn't exist in our guide yet.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/restaurants')}>
          Back to all restaurants
        </button>
      </div>
    )
  }

  const {
    name,
    japaneseName,
    category,
    area,
    priceLabel,
    priceRange,
    atmosphere,
    badge,
    image,
    description,
    whyRecommended,
    recommendedMenu,
    openingHours,
    notes,
    googleMapUrl,
    recommendedFor,
    tags,
  } = restaurant

  return (
    <>
      {/* ヒーロー画像 */}
      <div className="detail-hero">
        <img src={image} alt={name} className="detail-hero__img" />
        <div className="detail-hero__overlay" />
        {badge && <span className="detail-hero__badge">{badge}</span>}
        <button className="detail-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* メインコンテンツ */}
      <div className="detail-content">

        {/* 店名 & 基本情報 */}
        <div className="detail-header">
          <div className="detail-category">{category}</div>
          <h1 className="detail-name">{name}</h1>
          {japaneseName && (
            <div style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {japaneseName}
            </div>
          )}
          <div className="detail-meta">
            <span className="detail-meta-item">📍 {area}</span>
            <span className="detail-meta-item">💴 {priceLabel}</span>
            <span className="detail-meta-item">🎭 {atmosphere}</span>
          </div>
        </div>

        {/* 説明 */}
        <div className="detail-section">
          <h2 className="detail-section-title">About this place</h2>
          <p className="detail-description">{description}</p>
        </div>

        {/* なぜおすすめか */}
        <div className="detail-section">
          <h2 className="detail-section-title">Why we recommend it</h2>
          <div className="why-box">
            <p>{whyRecommended}</p>
          </div>
        </div>

        {/* おすすめメニュー */}
        <div className="detail-section">
          <h2 className="detail-section-title">Must-order dishes</h2>
          <ul className="menu-list">
            {recommendedMenu.map((item, i) => (
              <li key={i} className="menu-item">{item}</li>
            ))}
          </ul>
        </div>

        {/* 営業時間 */}
        <div className="detail-section">
          <h2 className="detail-section-title">Hours</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'var(--text-secondary)' }}>
            <span>🕒</span>
            <span>{openingHours}</span>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="detail-section">
          <h2 className="detail-section-title">Good to know</h2>
          <ul className="notes-list">
            {notes.map((note, i) => (
              <li key={i} className="note-item">
                <span className="note-icon">{noteIcon(note)}</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* こんな人におすすめ */}
        {recommendedFor && (
          <div className="detail-section">
            <h2 className="detail-section-title">Good for</h2>
            <div className="good-for-tags">
              {recommendedFor.map((item, i) => (
                <span key={i} className="tag-lg">{item}</span>
              ))}
            </div>
          </div>
        )}

        {/* Google Mapへのリンク */}
        <div className="detail-section">
          <h2 className="detail-section-title">Find it on the map</h2>
          <div className="map-section">
            <div className="map-section__header">
              <div className="map-section__icon">📍</div>
              <div className="map-section__info">
                <h4>{name}</h4>
                <p>{area}, Hiroshima</p>
              </div>
            </div>
            <a
              href={googleMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn"
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        </div>

        {/* ページ下部のナビ */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '48px' }}>
          <button className="btn btn-dark" onClick={() => navigate('/restaurants')}>
            ← All restaurants
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/quiz')}>
            ✨ Find another match
          </button>
        </div>
      </div>
    </>
  )
}
