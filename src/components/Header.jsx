import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">🍜</div>
          <div className="header__logo-text">
            <span className="header__logo-main">Hiroshima Local Plates</span>
            <span className="header__logo-sub">For travelers who want to eat like locals</span>
          </div>
        </Link>

        <nav className="header__nav">
          <Link
            to="/restaurants"
            className={`nav-link ${location.pathname === '/restaurants' ? 'nav-link--active' : ''}`}
          >
            Restaurants
          </Link>
          <Link to="/quiz" className="nav-link nav-link--primary">
            Find My Match ✨
          </Link>
        </nav>
      </div>
    </header>
  )
}
