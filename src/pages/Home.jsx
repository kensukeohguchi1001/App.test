import { Link } from 'react-router-dom'
import { restaurants } from '../data/restaurants'
import RestaurantCard from '../components/RestaurantCard'

const FEATURES = [
  {
    icon: '🏮',
    title: 'Picked by locals',
    desc: 'Every restaurant on this list was recommended by someone who actually lives in Hiroshima and eats here regularly — not a travel blogger.',
  },
  {
    icon: '✨',
    title: 'Smart matching',
    desc: "Not sure what you want? Answer 5 quick questions and we'll find the right restaurant for your mood, group, and budget.",
  },
  {
    icon: '🗺️',
    title: 'Google Maps ready',
    desc: 'Every listing links directly to Google Maps so you can navigate there the moment you decide.',
  },
]

export default function Home() {
  // ホームページにはfeaturedのレストランを3件表示
  const featured = restaurants.slice(0, 3)

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__dot" />
            Hiroshima Local Plates
          </div>
          <h1 className="hero__title">
            Discover Hiroshima's<br />
            <em>Hidden Gems</em>
          </h1>
          <p className="hero__subtitle">
            Real recommendations from locals who eat here every day.
            Not the tourist traps — the places they actually go.
          </p>
          <div className="hero__actions">
            <Link to="/restaurants" className="btn btn-primary">
              Browse Restaurants
            </Link>
            <Link to="/quiz" className="btn btn-secondary">
              ✨ Find My Match
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="features">
        <div className="features__inner">
          <div className="features__header">
            <div className="section-label">Why use this guide</div>
            <h2 className="section-title">Not your usual tourist guide</h2>
            <p className="section-subtitle">
              We asked real Hiroshima locals for their honest favorites. No ads, no sponsorships, no tourist traps.
            </p>
          </div>
          <div className="features__grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Restaurants ===== */}
      <section className="featured">
        <div className="featured__inner">
          <div className="featured__header">
            <div>
              <div className="section-label">Local picks</div>
              <h2 className="section-title">Start here</h2>
            </div>
            <Link to="/restaurants" className="btn btn-outline">
              See all restaurants
            </Link>
          </div>
          <div className="restaurant-grid">
            {featured.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Quiz CTA ===== */}
      <section className="quiz-cta">
        <div className="quiz-cta__inner">
          <span className="quiz-cta__emoji">🤔</span>
          <h2 className="quiz-cta__title">Can't decide?</h2>
          <p className="quiz-cta__desc">
            Tell us your mood, who you're with, and what you're craving.
            We'll pick the perfect Hiroshima restaurant for you in 30 seconds.
          </p>
          <Link to="/quiz" className="btn btn-primary" style={{ fontSize: '16px', padding: '16px 36px' }}>
            Start the quiz →
          </Link>
        </div>
      </section>
    </>
  )
}
