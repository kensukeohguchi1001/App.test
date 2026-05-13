import { useNavigate } from 'react-router-dom'

/** レストランのカード（一覧・featured で使用） */
export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate()
  const { id, name, category, area, priceRange, description, image, badge, tags } = restaurant

  // タグは最大3つ表示
  const visibleTags = tags.slice(0, 3)

  return (
    <article
      className="restaurant-card"
      onClick={() => navigate(`/restaurants/${id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/restaurants/${id}`)}
    >
      <div className="restaurant-card__img-wrap">
        <img
          src={image}
          alt={name}
          className="restaurant-card__img"
          loading="lazy"
        />
        {badge && <span className="restaurant-card__badge">{badge}</span>}
        <span className="restaurant-card__price">{priceRange}</span>
      </div>

      <div className="restaurant-card__body">
        <div className="restaurant-card__category">{category}</div>
        <h3 className="restaurant-card__name">{name}</h3>
        <div className="restaurant-card__meta">
          <span>📍 {area}</span>
          <span className="restaurant-card__meta-dot" />
          <span>{priceRange}</span>
        </div>
        <p className="restaurant-card__desc">{description}</p>
        <div className="restaurant-card__tags">
          {visibleTags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="restaurant-card__footer">
        <span className="restaurant-card__link">
          View details →
        </span>
      </div>
    </article>
  )
}
