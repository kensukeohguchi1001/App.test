import { useState } from 'react'
import { restaurants } from '../data/restaurants'
import RestaurantCard from '../components/RestaurantCard'

// フィルターカテゴリー一覧
const CATEGORIES = ['All', 'Oyster Bar', 'Seafood Counter', 'Okonomiyaki', 'Ramen', 'Izakaya', 'Standing Izakaya', 'Sake Bar']

export default function RestaurantList() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? restaurants
      : restaurants.filter((r) => r.category === activeCategory)

  return (
    <>
      {/* ページヘッダー */}
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__label">Hiroshima Local Guide</div>
          <h1 className="page-header__title">Local Favorites</h1>
          <p className="page-header__subtitle">
            Hand-picked by people who eat here every week. No tourist traps — just the real thing.
          </p>
        </div>
      </div>

      {/* カテゴリフィルター */}
      <div className="filter-bar">
        <div className="filter-bar__inner">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* レストラン一覧 */}
      <div className="restaurant-list">
        <div className="restaurant-list__inner">
          <p className="restaurant-list__count">
            {filtered.length} {filtered.length === 1 ? 'restaurant' : 'restaurants'} found
          </p>

          {filtered.length > 0 ? (
            <div className="restaurant-grid">
              {filtered.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🍽️</div>
              <p style={{ fontSize: '16px' }}>No restaurants in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
